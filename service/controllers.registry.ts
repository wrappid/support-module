import * as testController from "./controllers/test.controller";

const controllersRegistry = {
  createIssueReport: [
    CoreMiddlewaresRegistry.validation(createIssueReport),
    supportController.createReportIssue,
  ],
};

export default ControllersRegistry;
