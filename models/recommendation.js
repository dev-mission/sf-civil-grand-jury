'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define('Recommendation', {
    code: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    tableName: 'recommendations',
    underscored: true
  });
  Recommendation.associate = function(models) {
    Recommendation.belongsTo(models.Report, {as: 'report'});
    Recommendation.hasMany(models.RecommendationAssignment, {as: 'assignments'});
  };
  return Recommendation;
};
