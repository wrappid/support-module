const { createIssue } = require("./support.functions");

module.exports.createReportIssuePost = async (req) => {
  try {
    const {
      title,
      description,
      stepsToCreate,
      stackTrace,
      devInfo,
      reporterInfo,
      labels,
    } = req?.body || {};

    let data = await createIssue(
      title,
      description,
      stepsToCreate,
      stackTrace,
      JSON.parse(devInfo),
      JSON.parse(reporterInfo),
      labels.map((label) => label.label)
    );

    if (data) {
      return {status:200, data: data };
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};