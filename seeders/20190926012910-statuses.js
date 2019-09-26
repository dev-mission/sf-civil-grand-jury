'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const now = new Date();
    return queryInterface.bulkInsert('statuses', [
      {
        value: 'The recommendation has been implemented',
        created_at: now,
        updated_at: now
      },
      {
        value: 'The recommendation has not yet been implemented, but will be implemented in the future',
        created_at: now,
        updated_at: now
      },
      {
        value: 'The recommendation requires further analysis',
        created_at: now,
        updated_at: now
      },
      {
        value: 'The recommendation will not be implemented because it is not warranted or is not reasonable',
        created_at: now,
        updated_at: now
      },
      {
        value: 'No response',
        created_at: now,
        updated_at: now
      },
      {
        value: 'Unclear',
        created_at: now,
        updated_at: now
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
