'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.createTable('recommendations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        report_id: {
          allowNull: false,
          references: {
            model: {
              tableName: 'reports'
            },
            key: 'id'
          },
          type: Sequelize.INTEGER
        },
        code: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.TEXT
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });
      await queryInterface.addIndex('recommendations', ['report_id', 'code'], { unique: true, transaction });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recommendations');
  }
};
