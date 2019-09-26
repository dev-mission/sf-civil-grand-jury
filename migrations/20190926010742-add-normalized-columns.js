'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.addColumn('recommendations', 'normalized_code', Sequelize.STRING, {
        allowNull: true,
        defaultValue: null,
        transaction
      });
      await queryInterface.addColumn('recommendation_assignments', 'normalized_assignee', Sequelize.STRING, {
        allowNull: true,
        defaultValue: null,
        transaction
      });
      await queryInterface.addColumn('recommendation_assignment_responses', 'normalized_status', Sequelize.STRING, {
        allowNull: true,
        defaultValue: null,
        transaction
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.sequelize.transaction(async function(transaction) {
      await queryInterface.removeColumn('recommendation_assignment_responses', 'normalized_status', {transaction});
      await queryInterface.removeColumn('recommendation_assignments', 'normalized_assignee', {transaction});
      await queryInterface.removeColumn('recommendations', 'normalized_code', {transaction});
    });
  }
};
