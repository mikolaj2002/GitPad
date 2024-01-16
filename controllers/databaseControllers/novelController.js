
const config = require("../../config/config.json");
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const sequelize = new Sequelize(dbConfig);
const { Op } = require("sequelize");
const { getUserId } = require("../authenticationController");


const Novels = require('../../models/novels')(sequelize, Sequelize);
const Users = require('../../models/users')(sequelize, Sequelize);
const NovelEdits = require('../../models/noveledits')(sequelize, Sequelize);
const NovelStats = require('../../models/novelstats')(sequelize, Sequelize);

exports.sequelize = sequelize
exports.createNovel = async (novelId, user_id, title, text,public) => {
    // sprawdzenie czy ktoś forkował
    const sameName = await Novels.count({where:{title:title}});
    if(sameName > 0)
        return null;

    const r = await Novels.count({
        where: {
            novelId: {
                [Op.eq]:novelId
            }
        }
    })
    
    
    if(r == 0){
        const user = await Novels.findByPk(novelId);
        
        if(user.userId == user_id){
            await Novels.update({editable:false},{
                where:{
                    id:novelId
                }
            })
          }
    }

    return await Novels.create({
        novelId: novelId,
        userId: user_id,
        title: title,
        text: text,
        editable:true,
        public:public
    })
};

exports.getAllNovels = async () => {
    return Novels.findAll();
};

exports.getNovelById = async (req, res) =>{
  try {
        const info = await Novels.findByPk(req.body.id); 
        res.json(info);
    }catch(err){
      res.status(500).json({ error: err.message });
    }
};

exports.getNovelsWithTitleContaining = async (req, res) =>{
  try {
    const user = await Users.findOne({attributes: ['id'],where:{uid:getUserId()}})
    console.log("DEBUG")
    console.log(getUserId())
    console.log(user.id)
  const info = await Novels.findAll({
    attributes: ['id', 'title'],
      where: {
        title: {
          [Op.substring]:req.body.substring
        },
        editable:true,
        [Op.or]: [
          { public: true },
          { public: false,
            userId: user.id }
        ]
        // $or: [
        //   {
        //       public: true
        //   }, 
        //   {
        //       public:false,
        //       userId: user.id
        //   }
        // ]
      },
      order: [['createdAt', 'DESC']]
    }); 
    console.log(info)
    res.json(info);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.getChaptersOfNovel = async (req, res) =>{
    try {
		let chapters = []
		var chapter = await Novels.findByPk(req.body.id);

    	while(chapter.id != 1){
            // edity
            const edit = await NovelEdits.findOne({
                attributes: ['title'],
                  where: {
                    chapter_id: chapter.id,
                    novelId: req.body.id
                }
            })
            
			const data = {
				id: chapter.id,
				title: (edit != null && edit.title != null) ? edit.title : chapter.title
			}
			chapters.push(data);
			chapter = await Novels.findByPk(chapter.novelId)
		}
    
      	res.json(chapters);
    }catch(err){
      res.status(500).json({ error: err.message });
    }
  };

  exports.getChapterContent = async (req, res) =>{
    try {
		const chapter = await Novels.findByPk(req.body.id);
		const edits = await NovelEdits.findOne({
            attributes: ['title', 'text'],
              where: {
                chapter_id: {
                  [Op.eq]:req.body.id
                },
                novelId: {
                    [Op.eq]: req.body.novelId
                }
            }
        });     
        

        if(edits != null && edits.text != null)
            res.json({text:edits.text});
        else
    	    res.json({text:chapter.text});
    }catch(err){
      res.status(500).json({ error: err.message });
    }
  };

exports.publishNovel = async (req, res) => {
    try {
        // wstaw nową opowieść, w [0] jest jej nowa część
        const user = await Users.findOne({attributes: ['id'],where:{uid:getUserId()}})

        const newNovel = await this.createNovel(
            req.body.parentId,
            user.id,
            req.body.chapters[0].title,
            req.body.chapters[0].text,
            req.body.public
        )


        if(newNovel == null){
            res.json({
                error:true,
                message:"Powieść o takim tytule już isnteje"
            })
            return;
        }


        var chapter = await Novels.findByPk(req.body.parentId);

    	while(chapter.id != 1){
            req.body.chapters.forEach(chap => {
                if(chap.id == chapter.id){
                    var changed = false
                    var newChapter = {
                        novelId:newNovel.id,
                        chapter_id:chap.id,
                        title:null,
                        text:null
                    }
                    
                    if(chap.title !== chapter.title && chap.title!=''){
                        newChapter.title = chap.title;
                        changed = true;
                    }
                    
                    if(chap.text != chapter.text && chap.text!=''){
                        newChapter.text = chap.text;
                        changed = true;
                    }
                    
                    if(changed){
                        NovelEdits.create(newChapter);
                    }
                }
            });
            
			chapter = await Novels.findByPk(chapter.novelId);
		}

        // if(false)
        

        res.json({error:false});
    }catch(err){
         res.status(500).json({ error: err.message });
    }
}

exports.getNovelStats = async (req, res) => {
  try {
      const stats = await NovelStats.findOne({where:{ novelId: req.body.id}});
      res.json(stats);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.getUserUID = async (req, res) => {
  try {
    const info = await Novels.findAll({
      attributes: ['id', 'title'],
        where: {
          title: {
            [Op.substring]:'a'
          },
          editable:true,
          [Op.or]: [
            { public: true },
            { public: false,
            userId: 1}
          ]
          // public:true
          // $or: [
          //   {
          //       public: true
          //   }, 
          //   {
          //       public:false,
          //       userId: 10
          //   }
          // ]
        },
        order: [['createdAt', 'DESC']]
      }); 
      console.log(info)
      const uid = getUserId()
      console.log("AAAA")

      res.json({uid:uid});
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};