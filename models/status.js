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
  Status.VALUE_IMPLEMENTED = 'The recommendation has been implemented';
  Status.VALUE_NOT_IMPLEMENTED = 'The recommendation will not be implemented because it is not warranted or is not reasonable';
  return Status;
};
