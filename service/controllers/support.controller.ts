import { createReportIssuePost } from "../functions/support.helper";

/**
 * Github - Error Reporting
 *
 * @param {*} app
 * @param {*} db
 */
export async function createReportIssue(req, res) {
  try {
    /**
     * GitHub - Post Issue
     */
    let data = await createReportIssuePost(req);
    res.status(data?.status).json(data);
  } catch (error) {
    console.error("logout Error:: ", error);
    res.status(500).json({
      message: "Error to create issue",
      error: { message: error.message, stackTrace: error.stack },
    });
  }
}
