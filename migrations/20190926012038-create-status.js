'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.createTable('statuses', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        value: {
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
      }, {transaction});
      await queryInterface.addColumn('recommendation_assignment_responses', 'status_id', Sequelize.INTEGER, {
        allowNull: true,
        defaultValue: null,
        references: {
          model: {
            tableName: 'statuses'
          },
          key: 'id'
        },
        transaction
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.removeColumn('recommendation_assignment_responses', 'status_id', {transaction});
      await queryInterface.dropTable('statuses', {transaction});
    });
  }
};
