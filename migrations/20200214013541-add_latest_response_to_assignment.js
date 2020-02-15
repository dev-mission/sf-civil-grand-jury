'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.addColumn('recommendation_assignments', 'latest_recommendation_assignment_response_id', {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'recommendation_assignment_responses'
          },
          key: 'id'
        },
      }, {
        transaction
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.removeColumn('recommendation_assignments', 'latest_recommendation_assignment_response_id', {transaction});
    });
  }
};
