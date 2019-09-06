'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    title: DataTypes.STRING,
    shortTitle: {
      type: DataTypes.STRING,
      field: 'short_title'
    },
    year: DataTypes.STRING
  }, {
    tableName: 'reports',
    underscored: true
  });
  Report.associate = function(models) {
    Report.hasMany(models.Recommendation, {as: 'recommendations'});
  };
  return Report;
};
