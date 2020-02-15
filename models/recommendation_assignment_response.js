'use strict';

const sequelizePaginate = require('sequelize-paginate')

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
    RecommendationAssignmentResponse.hasOne(models.RecommendationAssignment, {foreignKey: {fieldName: 'latestResponseId', field: 'latest_recommendation_assignment_response_id'}});
    RecommendationAssignmentResponse.belongsTo(models.RecommendationAssignment, {as: 'assignment', foreignKey: {fieldName: 'assignmentId', field: 'recommendation_assignment_id'}});
    RecommendationAssignmentResponse.belongsTo(models.Status, {as: 'normalizedStatus', foreignKey: {fieldName: 'statusId', field: 'status_id'}});

    let STATUS_NO_RESPONSE = null;
    RecommendationAssignmentResponse.afterSave(async function(response, options) {
      //// load no response status once
      if (STATUS_NO_RESPONSE == null) {
        STATUS_NO_RESPONSE = await models.Status.findOne({where: {value: models.Status.VALUE_NO_RESPONSE}});
      }
      //// check if latest response field should be updated on assignment
      const assignment = await response.getAssignment();
      const latestResponse = await assignment.getLatestResponse();
      if (latestResponse == null) {
        //// if no latest response on assignment, just assign immediately
        await assignment.update({latestResponseId: response.id});
      } else if (latestResponse.id != response.id) {
        //// if different latest response exists, first check if year is newer, or latest is no response
        if (latestResponse.statusId == STATUS_NO_RESPONSE.id || parseInt(response.year) > parseInt(latestResponse.year)) {
          if (response.statusId != STATUS_NO_RESPONSE.id) {
            //// don't overwrite with a null/NO RESPONSE status
            await assignment.update({latestResponseId: response.id});
          }
        }
      }
    });
  };
  sequelizePaginate.paginate(RecommendationAssignmentResponse)
  return RecommendationAssignmentResponse;
};
