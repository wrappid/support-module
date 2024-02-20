import { Request, Response} from "express";
import { createReportIssuePost } from "../functions/support.helper";

/**
 *  Github - Error Reporting
 * 
 * @param req 
 * @param res 
 */
export async function createReportIssue(req: Request, res: Response) {
  try {
    /**
     * GitHub - Post Issue
     */
    const data = await createReportIssuePost(req);
    res.status(data?.status).json(data);
  } catch (error) {
    console.error("logout Error:: ", error);
    res.status(500).json({
      message: "Error to create issue",
      error: { message: error.message, stackTrace: error.stack },
    });
  }
}
