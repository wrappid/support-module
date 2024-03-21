import * as yup from "yup";

const createIssueReport = {
  body: yup
    .object({
      title: yup.string().required(),
      description: yup.string(),
      stepsToCreate: yup.string(),
      stackTrace: yup.string(),
      isStacktrace: yup.string(),
      devInfo: yup.string().required(),
      reporterInfo: yup.string().required(),
      labels: yup.array()
    })
    .noUnknown()
    .strict(),
  query: yup.object<any>().noUnknown().strict(),
};

export {
  createIssueReport
};