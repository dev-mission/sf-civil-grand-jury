'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecommendationAssignment = sequelize.define('RecommendationAssignment', {
    assignee: DataTypes.STRING
  }, {
    tableName: 'recommendation_assignments',
    underscored: true
  });
  RecommendationAssignment.associate = function(models) {
    RecommendationAssignment.belongsTo(models.Recommendation, {as: 'recommendation'});
    RecommendationAssignment.belongsTo(models.RecommendationAssignmentResponse, {as: 'latestResponse', foreignKey: {fieldName: 'latestResponseId', field: 'latest_recommendation_assignment_response_id'}});
    RecommendationAssignment.hasMany(models.RecommendationAssignmentResponse, {as: 'responses'});
  };
  return RecommendationAssignment;
};
