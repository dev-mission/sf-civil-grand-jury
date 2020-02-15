'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    value: DataTypes.STRING
  }, {
    tableName: 'statuses',
    underscored: true
  });
  Status.associate = function(models) {
    // associations can be defined here
  };
  Status.VALUE_NO_RESPONSE = 'No response';
  Status.VALUE_FURTHER_ANALYSIS = 'The recommendation requires further analysis';
  Status.VALUE_IMPLEMENTED = 'The recommendation has been implemented';
  Status.VALUE_NOT_IMPLEMENTED = 'The recommendation will not be implemented because it is not warranted or is not reasonable';
  Status.VALUE_WILL_BE_IMPLEMENTED = 'The recommendation has not yet been implemented, but will be implemented in the future';
  return Status;
};
