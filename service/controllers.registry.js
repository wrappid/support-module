const supportController = require("./controllers/support.controller");
const {createIssueReport} = require("./validations/support.validation");
const { CoreMiddlewaresRegistry } = require("@wrappid/service-core");
const controllersRegistry = {
    createIssueReport: [
      CoreMiddlewaresRegistry.validation(createIssueReport),
      supportController.createReportIssue,
    ],
  };

exports.controllersRegistry = controllersRegistry;