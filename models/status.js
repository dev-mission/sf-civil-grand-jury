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
  return Status;
};
