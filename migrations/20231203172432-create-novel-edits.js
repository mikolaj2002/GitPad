'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NovelEdits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      novelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Novels',
          key: 'id'
        },
        allowNull: false
      },
      // novel_id: {
      //   type: Sequelize.INTEGER,
      //   foreignKey: true
      // },
      chapter_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      edit_start: {
        type: Sequelize.INTEGER
      },
      edit_end: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NovelEdits');
  }
};