'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.createTable('recommendation_assignments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        recommendation_id: {
          allowNull: false,
          references: {
            model: {
              tableName: 'recommendations'
            },
            key: 'id'
          },
          type: Sequelize.INTEGER
        },
        assignee: {
          allowNull: false,
          type: Sequelize.STRING
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
      await queryInterface.addIndex('recommendation_assignments', ['recommendation_id', 'assignee'], { unique: true, transaction });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recommendation_assignments');
  }
};
