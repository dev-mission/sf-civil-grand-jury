'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.createTable('recommendation_assignment_responses', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        recommendation_assignment_id: {
          allowNull: false,
          references: {
            model: {
              tableName: 'recommendation_assignments'
            },
            key: 'id'
          },
          type: Sequelize.INTEGER
        },
        year: {
          allowNull: false,
          type: Sequelize.STRING
        },
        status: {
          allowNull: false,
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
      await queryInterface.addIndex('recommendation_assignment_responses', ['recommendation_assignment_id', 'year'], { unique: true, transaction });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recommendation_assignment_responses');
  }
};
