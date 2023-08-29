const yup = require("yup");

const createIssueReport = {
  body: yup
    .object({
      name: yup.string().required(),
    })
    .noUnknown()
    .strict(),
  query: yup.object({}).noUnknown().strict(),
};

module.exports = {
  createIssueReport
};
