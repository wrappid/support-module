import { configProvider } from "@wrappid/service-core";
import fetch from "node-fetch-commonjs";
import { createIssue } from "./support.functions";

type ArrayUrlsTitles = {
  url: string;
  title: string;
}

export const createReportIssuePost = async (req:any) => {
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


    const urlAndTitleArray: ArrayUrlsTitles[] = await getAllIssueTitles();
    if(matchString(urlAndTitleArray, title)){
      const commentBody = "This is test  comment from Node.js script.";
      const issueUrl: string = urlAndTitleArray.find((item:ArrayUrlsTitles) => item.title === title)?.url as string;
      const commentUrl: string = issueUrl + "/comments";
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${configProvider().github.token}`
      };
      const payload = {
        body: commentBody
      };
      await fetch(commentUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error creating comment: ${response.status}`);
          }
          console.log("Comment created successfully!");
        });  
      return {status:200, message: "Comment created successfully!" };
      
    }
    const data = await createIssue(
      title,
      description,//
      stepsToCreate,//
      stackTrace,
      JSON.parse(devInfo),
      JSON.parse(reporterInfo),
      labels.map((label: { label: any; }) => label.label)
    );

    if (data) {
      return {status:200, data: data };
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error:any) {
    console.error(error);
    throw error;
  }
};


async function getAllIssueTitles() {
  try {
    const response = await fetch(configProvider().github.createIssueURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + configProvider().github.token,
      }
    });
    if (!response.ok) {
      throw new Error(`Error fetching issues: ${response.statusText}`);
    }
    const issues:any = await response.json();
    const urlAndTitleArray: ArrayUrlsTitles[] = issues.map((item: { url: string; title: string; }) => ({
      url: item.url,
      title: item.title,
    }));
    return urlAndTitleArray;
  } catch (error) {
    console.log(error);
    throw error;
    
  }
  
}

function matchString(urlAndTitleArray: ArrayUrlsTitles[], targetString: string) {
  try {
    const stringArray: string[] = urlAndTitleArray.map((item: {title: string; }) => item.title);
    for (const string of stringArray) {
      if (string.includes(targetString)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
