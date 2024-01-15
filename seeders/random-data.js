const { faker } = require('@faker-js/faker');
const { createNovel } = require('../controllers/databaseControllers/novelController');
module.exports = {
  up: async (queryInterface, Sequelize) => {
        let nOfUsers = 5;
      let users = []
      for(let i=0; i<nOfUsers;i++){
        users.push({
            nick: faker.person.firstName(),
            follows: faker.number.int(100),
            red_flags: faker.number.int(3)
        })
      }
    await queryInterface.bulkInsert('Users', users);

    await queryInterface.bulkInsert('Novels', [{
      novelId: 0,
      userId: 1,
      title: "",
      text: "",
      editable:true
  }]);
    
    let novelStats = []
      for(let i=1; i<10;i++){
        await createNovel(
            faker.number.int(i-1)+1,
            faker.number.int(nOfUsers-1)+1,
            faker.lorem.word(),
            faker.lorem.paragraphs(1)
        )

        novelStats.push({
            novelId: i+1,
            views: faker.number.int(50),
            likes: faker.number.int(10)
        })
      }
  
    await queryInterface.bulkInsert('NovelStats', novelStats);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Novels', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
