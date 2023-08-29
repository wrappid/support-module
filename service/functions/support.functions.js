const fetch = require("node-fetch");
const env = process.env.NODE_ENV || "development";
// const config = require("../../config/config.json")[env];
const {
  configProvider,
  coreConstant,
  // databaseActions,
  // databaseProvider,
} = require("@wrappid/service-core");

let config = configProvider;

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
const createIssue = async (
  title,
  description,
  stepsToCreate,
  stackTrace,
  devInfo,
  reporterInfo,
  labels
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
    let issueData = {
      title: title,
      body: issueBody,
      labels: [...config.github.defaultLabels, ...labels],
    };

    let result = await fetch(config.github.createIssueURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.github.token,
      },
      body: JSON.stringify(issueData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          return data;
        } else {
          console.error("error: ", resdata);
          throw new Error(res?.message || "Something went wrong.");
        }
      })
      .catch((error) => {
        console.error("error: ", error);
        throw new Error(error);
      });
    return result;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong.");
  }
};

module.exports = { createIssue };
