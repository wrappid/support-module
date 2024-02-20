import { CoreMiddlewaresRegistry } from "@wrappid/service-core";
import * as supportController from "./controllers/support.controller";
import { createIssueReport } from "./validations/support.validation";

const ControllersRegistry = {
  createIssueReport: [
    CoreMiddlewaresRegistry.validation(createIssueReport),
    supportController.createReportIssue,
  ],
};

export default ControllersRegistry;
