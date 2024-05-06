import { ApplicationContext } from "@wrappid/service-core";
import fetch from "node-fetch-commonjs";
import { createIssue } from "./support.functions";

type UrlsTitlesBodyObj = {
  url: string;
  title: string;
  body: string
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

    const urlAndTitleArray: UrlsTitlesBodyObj[] = await getAllIssueInfo();
    //chcke issue exist or not
    if(await matchString(urlAndTitleArray, title)){
      const issueUrl: UrlsTitlesBodyObj  = urlAndTitleArray.find((item:UrlsTitlesBodyObj) => item.title === title) as UrlsTitlesBodyObj;
      const commentUrl: string = issueUrl.url + "/comments";
      const commentBody: string = await createCommentBody(issueUrl.body, {
        currentDescription: description,
        currentStepsToCreate: stepsToCreate,
        currentStackTrace: stackTrace,
        currentDevInfo: devInfo,
        currentReporterInfo: reporterInfo});
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ApplicationContext.getContext("config").github.token}`
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
        });  
      console.log("Comment created successfully!");
      return {status:200, message: "Comment created successfully!" };
    }

    const data = await createIssue(
      title,
      description,
      stepsToCreate,
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


async function getAllIssueInfo(): Promise<UrlsTitlesBodyObj[]> {
  try {
    const response = await fetch(ApplicationContext.getContext("config").github.createIssueURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ApplicationContext.getContext("config").github.token,
      }
    });
    if (!response.ok) {
      throw new Error(`Error fetching issues: ${response.statusText}`);
    }
    const issues:any = await response.json();
    const urlAndTitleArray: UrlsTitlesBodyObj[] = issues.map((item: { url: string; title: string; body: string }) => ({
      url: item.url,
      title: item.title,
      body: item.body
    }));
    return urlAndTitleArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function matchString(urlAndTitleArray: UrlsTitlesBodyObj[], targetString: string): Promise<boolean> {
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


async function createCommentBody(issueBody: string, {
  currentDescription,
  currentStepsToCreate,
  currentStackTrace,
  currentDevInfo,
  currentReporterInfo}:any): Promise<string> {
  try {
  // Regular expression to match the Description section
    const descriptionRegex = /## Description:\n(.*?)(?=##|\n$)/s;
    const stepsToCreateRegex = /## Steps To Create:\n(.*?)\n##/s;
    const stackTraceRegex = /<pre>([\s\S]*?)<\/pre>/;
    // const developerInfoRegex = /## Developer Information:(.*?)## Reporter Information:/s;
    // const reporterInformationRegex = /## Reporter Information:(.*?)\|(.*)/s;

    // Extract the description using match()
    const descriptionMatch = issueBody.match(descriptionRegex);
    const description = descriptionMatch ? descriptionMatch[1].trim() : "";

    // Extracting steps to create
    const stepsToCreateMatch = issueBody.match(stepsToCreateRegex);
    const stepsToCreate = stepsToCreateMatch ? stepsToCreateMatch[1].trim() : "";

    // Extracting stack trace
    // const stackTracematch = stackTraceRegex.exec(issueBody);
    const stackTracematch = issueBody.match(stackTraceRegex);
    const stackTrace = stackTracematch ? stackTracematch[1].trim(): "";
  
    /*
   // Extracting developer Info
   const developerInfoMatch = issueBody.match(developerInfoRegex);
   const developerInformation = developerInfoMatch ? developerInfoMatch[1].trim(): "";

   //Extracting Reporter Information
   const reporterInformatinMatch = issueBody.match(reporterInformationRegex);
   const reporterInformaion = reporterInformatinMatch ? reporterInformatinMatch[1].trim(): "";
    */

    let commentBody = "## Description:\n";
    if(currentDescription.trim() != description.trim() ){
      if(currentDescription.trim() === ""){
        commentBody += "No description provided.";
      }else{
        commentBody += currentDescription;
      }
    }else{
      commentBody += "Same as above";
    }

    commentBody += "\n## Steps To Create:\n";
    if(currentStepsToCreate.trim() != stepsToCreate.trim()){
      if(currentStepsToCreate.trim() === ""){
        commentBody += "No steps provided.";
      }else{
        commentBody += currentStepsToCreate;
      }
    }else{
      commentBody += "Same as above";
    }

    commentBody += "\n## Stack trace:\n";
    if(currentStackTrace.trim() != stackTrace.trim()){
      if(currentStackTrace.trim() === ""){
        issueBody += "<pre>No stack trace available.</pre>";
      }else{
        commentBody += "<pre>" + stackTrace + "</pre>";
      }
    }else{
      commentBody += "Same as above";
    }

    /*
    commentBody += "\n## Developer Information:\n";
    if(currentDevInfo.trim() != developerInformation.trim()){
      if(currentDevInfo.trim() === ""){
        commentBody += "No developer information provided.";
      }else{
        currentDevInfo = JSON.parse(currentDevInfo);
        commentBody += "| Key | Value |";
        commentBody += "\n|---|---|";
        commentBody += "\n| Frontend URL | " + currentDevInfo?.frontend?.url + " |";
        commentBody += "\n| Frontend Version | " + currentDevInfo?.frontend?.version + " |";
        commentBody += "\n| Backend URL | " + currentDevInfo?.backend?.url + " |";
        commentBody += "\n| Backend Version | " + currentDevInfo?.backend?.version + " |";
        commentBody += "\n| User Agent | " + currentDevInfo?.client?.userAgent + " |";
        commentBody += "\n| Device | " + currentDevInfo?.client?.device + " |";
        commentBody += "\n| Browser | " + currentDevInfo?.client?.browser + " |";
        commentBody += "\n| OS | " + currentDevInfo?.client?.os + " |";
      }
    }else{
      commentBody += "Same as above";
    }
    */

    /*
    commentBody += "\n## Reporter Information:\n";
    if(currentReporterInfo.trim() != reporterInformaion.trim()){
      if(currentReporterInfo.trim() === ""){
        commentBody += "No reporter information provided.";
      }else{
        currentReporterInfo = JSON.parse(currentReporterInfo);
        commentBody += "| Key | Value |";
        commentBody += "\n|---|---|";
        commentBody += "\n| Name | " + currentReporterInfo?.name + " |";
        commentBody += "\n| Email | " + currentReporterInfo?.email + " |";
        commentBody += "\n| Phone | " + currentReporterInfo?.phone + " |";
        commentBody += "\n| Role | " + currentReporterInfo?.role + " |";
        commentBody += "\n| Creation Time | " + currentReporterInfo?.creationTime + " |";
      }
    }else{
      commentBody += "Same as above";
    }
    */

    // Developer Information
    commentBody += "\n## Developer Information:\n";
    if (currentDevInfo) {
      const devInfo = JSON.parse(currentDevInfo);
      commentBody += "| Key | Value |";
      commentBody += "\n|---|---|";
      commentBody += "\n| Frontend URL | " + devInfo?.frontend?.url + " |";
      commentBody += "\n| Frontend Version | " + devInfo?.frontend?.version + " |";
      commentBody += "\n| Backend URL | " + devInfo?.backend?.url + " |";
      commentBody += "\n| Backend Version | " + devInfo?.backend?.version + " |";
      commentBody += "\n| User Agent | " + devInfo?.client?.userAgent + " |";
      commentBody += "\n| Device | " + devInfo?.client?.device + " |";
      commentBody += "\n| Browser | " + devInfo?.client?.browser + " |";
      commentBody += "\n| OS | " + devInfo?.client?.os + " |";
    } else {
      commentBody += "No developer information provided.";
    }

    // Reporter Information
    commentBody += "\n## Reporter Information:\n";
    if (currentReporterInfo) {
      const reporterInfo = JSON.parse(currentReporterInfo);
      commentBody += "| Key | Value |";
      commentBody += "\n|---|---|";
      commentBody += "\n| Name | " + reporterInfo?.name + " |";
      commentBody += "\n| Email | " + reporterInfo?.email + " |";
      commentBody += "\n| Phone | " + reporterInfo?.phone + " |";
      commentBody += "\n| Role | " + reporterInfo?.role + " |";
      commentBody += "\n| Creation Time | " + reporterInfo?.creationTime + " |";
    } else {
      commentBody += "No reporter information provided.";
    }
    return commentBody;
  } catch (error) {
    console.log(error);
    throw error;
  }
}