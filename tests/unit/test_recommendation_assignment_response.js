const assert = require('assert');
const models = require('../../models');

describe('RecommendationAssignmentResponse', function() {
  afterEach(async function() {
    await models.sequelize.query("UPDATE recommendation_assignments SET latest_recommendation_assignment_response_id=NULL");
    await models.sequelize.query("DELETE FROM recommendation_assignment_responses");
    await models.sequelize.query("DELETE FROM recommendation_assignments");
    await models.sequelize.query("DELETE FROM recommendations");
    await models.sequelize.query("DELETE FROM reports");
  });

  describe('#afterSave()', function() {
    it('should update its parent RecommendationAssignment with the latest response', async function() {
      const report = await models.Report.create({year: '2019-2020', title: 'Test Report'});
      const recommendation = await models.Recommendation.create({reportId: report.id, code: 'R1', content: 'Test Recommendation'});
      const assignment = await models.RecommendationAssignment.create({recommendationId: recommendation.id, assignee: 'Test Assignee'});

      //// to start, the latest response should be null for a new assignment
      assert.equal(assignment.latestResponseId, null);

      //// create a response
      const STATUS_WILL_BE_IMPLEMENTED = await models.Status.findOne({where: {value: models.Status.VALUE_WILL_BE_IMPLEMENTED}});
      const response = await models.RecommendationAssignmentResponse.create({assignmentId: assignment.id, year: '2019', status: 'To do in the future', content: 'Test Response 2', statusId: STATUS_WILL_BE_IMPLEMENTED.id});
      await assignment.reload()
      //// the latest response on the assignment will be this first new response
      assert.equal(assignment.latestResponseId, response.id);

      //// create an earlier response
      const STATUS_FUTHER_ANALYSIS = await models.Status.findOne({where: {value: models.Status.VALUE_FURTHER_ANALYSIS}});
      const earlierResponse = await models.RecommendationAssignmentResponse.create({assignmentId: assignment.id, year: '2018', status: 'Needs analysis', content: 'Test Response 2', statusId: STATUS_FUTHER_ANALYSIS.id});
      await assignment.reload()
      //// the latest response on the assignment will still be the first newer response
      assert.equal(assignment.latestResponseId, response.id);

      //// create a later response
      const STATUS_IMPLEMENTED = await models.Status.findOne({where: {value: models.Status.VALUE_IMPLEMENTED}});
      const laterResponse = await models.RecommendationAssignmentResponse.create({assignmentId: assignment.id, year: '2020', status: 'Done', content: 'Test Response 3', statusId: STATUS_IMPLEMENTED.id});
      await assignment.reload()
      //// the latest response on the assignment will be this latest response
      assert.equal(assignment.latestResponseId, laterResponse.id);

      //// create another later, empty response
      const STATUS_NO_RESPONSE = await models.Status.findOne({where: {value: models.Status.VALUE_NO_RESPONSE}});
      const emptyResponse = await models.RecommendationAssignmentResponse.create({assignmentId: assignment.id, year: '2021', status: '**', content: '', statusId: STATUS_NO_RESPONSE.id});
      await assignment.reload()
      //// the latest response on the assignment will still be the last response
      assert.equal(assignment.latestResponseId, laterResponse.id);
    });

    it('should update its parent RecommendationAssignment with an older response if the latest is none', async function() {
      const report = await models.Report.create({year: '2019-2020', title: 'Test Report'});
      const recommendation = await models.Recommendation.create({reportId: report.id, code: 'R1', content: 'Test Recommendation'});
      const assignment = await models.RecommendationAssignment.create({recommendationId: recommendation.id, assignee: 'Test Assignee'});

      //// to start, the latest response should be null for a new assignment
      assert.equal(assignment.latestResponseId, null);

      //// create a "no response" response
      const STATUS_NO_RESPONSE = await models.Status.findOne({where: {value: models.Status.VALUE_NO_RESPONSE}});
      const response = await models.RecommendationAssignmentResponse.create({assignmentId: assignment.id, year: '2019', status: '**', content: 'Test Response', statusId: STATUS_NO_RESPONSE.id});
      await assignment.reload()
      //// the latest response on the assignment will be this first new response
      assert.equal(assignment.latestResponseId, response.id);

      //// create an earlier response
      const STATUS_FUTHER_ANALYSIS = await models.Status.findOne({where: {value: models.Status.VALUE_FURTHER_ANALYSIS}});
      const earlierResponse = await models.RecommendationAssignmentResponse.create({assignmentId: assignment.id, year: '2018', status: 'Needs analysis', content: 'Test Response 2', statusId: STATUS_FUTHER_ANALYSIS.id});
      await assignment.reload()
      //// the earlier response will override a "no response" later response
      assert.equal(assignment.latestResponseId, earlierResponse.id);
    });
  });
});
