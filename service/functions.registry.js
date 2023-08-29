const supportFunctions = require("./functions/support.functions");

const functionsRegistry = {
  postCreateIssueReport: supportFunctions.createIssue,
};
// IssueReportingForm
exports.functionsRegistry = functionsRegistry;
// const functionsRegistry = {
    // "readsupportData": supportFunctions.readsupportData,
    // "readsupportDataAll": supportFunctions.readsupportDataAll,
    // "createsupportData": supportFunctions.createsupportData,
    // "updatesupportData": supportFunctions.updatesupportData,
    // "deletesupportData": supportFunctions.deletesupportData,
// };

// exports.functionsRegistry = functionsRegistry;
