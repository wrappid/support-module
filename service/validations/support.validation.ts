import * as yup from "yup";

const createIssueReport = {
  body: yup
    .object({
      name: yup.string().required(),
    })
    .noUnknown()
    .strict(),
  query: yup.object<any>().noUnknown().strict(),
};

export {
  createIssueReport
};