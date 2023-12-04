const { faker } = require('@faker-js/faker');
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

    let novels = []
    let novelStats = []
      for(let i=0; i<10;i++){
        novels.push({
            novelId: faker.number.int(i),
            userId: faker.number.int(nOfUsers-1)+1,
            title: faker.lorem.word(),
            text: faker.lorem.paragraphs(1)
        })

        novelStats.push({
            novelId: i+1,
            views: faker.number.int(50),
            likes: faker.number.int(10)
        })
      }
    await queryInterface.bulkInsert('Novels', novels);
    await queryInterface.bulkInsert('NovelStats', novelStats);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Novels', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
