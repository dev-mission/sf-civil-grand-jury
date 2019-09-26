'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecommendationAssignmentResponse = sequelize.define('RecommendationAssignmentResponse', {
    year: DataTypes.STRING,
    status: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    tableName: 'recommendation_assignment_responses',
    underscored: true
  });
  RecommendationAssignmentResponse.associate = function(models) {
    RecommendationAssignmentResponse.belongsTo(models.RecommendationAssignment, {as: 'assignment', foreignKey: {fieldName: 'assignmentId', field: 'recommendation_assignment_id'}});
    RecommendationAssignmentResponse.belongsTo(models.Status, {as: 'normalized_status', foreignKey: {fieldName: 'statusId', field: 'status_id'}});
  };
  return RecommendationAssignmentResponse;
};
