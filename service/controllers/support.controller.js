const { createReportIssue, createReportIssuePost } = require("../functions/support.helper");

/**
 * Github - Error Reporting
 *
 * @param {*} app
 * @param {*} db
 */
module.exports.createReportIssue = (app, db) => {
  /**
   * GitHub - Post Issue
   */
  createReportIssuePost(app, db)

};
