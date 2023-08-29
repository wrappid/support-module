const { createIssue } = require("./support.functions");

module.exports.createReportIssuePost=()=>{

app.post("/noauth/issue/create", async (req, res) => {
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
        res.status(200).json({ data: data });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error to create issue",
        error: { message: error.message, stackTrace: error.stack },
      });
    }
  });
}