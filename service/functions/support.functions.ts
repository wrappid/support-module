import { ApplicationContext } from "@wrappid/service-core";

import fetch from "node-fetch-commonjs";

/**
 * 
 * @param {*} title 
 * @param {*} description 
 * @param {*} stepsToCreate 
 * @param {*} stackTrace 
 * @param {*} devInfo 
 * @param {*} reporterInfo 
 * @param {*} labels 
 * @returns 
 */
export const createIssue = async (
  title: any,
  description: any,
  stepsToCreate: any,
  stackTrace: any,
  devInfo: any,
  reporterInfo: any,
  labels: any
) => {
  try {
    /**
     * @todo
     * -
     *
     */
    // Description
    let issueBody = "## Description:\n";
    if (description) {
      issueBody += description;
    } else {
      issueBody += "No description provided.";
    }
    // Steps to create
    issueBody += "\n## Steps To Create:\n";
    if (stepsToCreate) {
      issueBody += stepsToCreate;
    } else {
      issueBody += "No steps provided.";
    }
    // Stack trace
    issueBody += "\n## Stack trace:\n";
    if (stackTrace) {
      issueBody += "<pre>" + stackTrace + "</pre>";
    } else {
      issueBody += "<pre>No stack trace available.</pre>";
    }
    // Developer Information
    issueBody += "\n## Developer Information:\n";
    if (devInfo) {
      issueBody += "| Key | Value |";
      issueBody += "\n|---|---|";
      issueBody += "\n| Frontend URL | " + devInfo?.frontend?.url + " |";
      issueBody += "\n| Frontend Version | " + devInfo?.frontend?.version + " |";
      issueBody += "\n| Backend URL | " + devInfo?.backend?.url + " |";
      issueBody += "\n| Backend Version | " + devInfo?.backend?.version + " |";
      issueBody += "\n| User Agent | " + devInfo?.client?.userAgent + " |";
      issueBody += "\n| Device | " + devInfo?.client?.device + " |";
      issueBody += "\n| Browser | " + devInfo?.client?.browser + " |";
      issueBody += "\n| OS | " + devInfo?.client?.os + " |";
    } else {
      issueBody += "No developer information provided.";
    }

    // Reporter Information
    issueBody += "\n## Reporter Information:\n";
    if (reporterInfo) {
      issueBody += "| Key | Value |";
      issueBody += "\n|---|---|";
      issueBody += "\n| Name | " + reporterInfo?.name + " |";
      issueBody += "\n| Email | " + reporterInfo?.email + " |";
      issueBody += "\n| Phone | " + reporterInfo?.phone + " |";
      issueBody += "\n| Role | " + reporterInfo?.role + " |";
      issueBody += "\n| Creation Time | " + reporterInfo?.creationTime + " |";
    } else {
      issueBody += "No reporter information provided.";
    }
    const issueData = {
      title: title,
      body: issueBody,
      labels: [...ApplicationContext.getContext("config").github.defaultLabels, ...labels],
    };

    const result = await fetch(ApplicationContext.getContext("config").github.createIssueURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ApplicationContext.getContext("config").github.token,
      },
      body: JSON.stringify(issueData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          return data;
        } else {
          throw new Error("Something went wrong.");
        }
      })
      .catch((error:any) => {
        console.error("error: ", error);
        throw new Error(error);
      });
    return result;
  } catch (error:any) {
    console.error(error);
    throw new Error(error?.message || "Something went wrong.");
  }
};

