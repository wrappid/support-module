const RoutesRegistry = {
  createIssueReport: {
    title: "Create Issue Github",
    url: "noauth/issue/create",
    authRequired: false,
    entityRef: "createIssueReport",
    reqMethod: "post",
    controllerRef: "createIssueReport",
    swaggerJson: {
      "tags": [
        "Support Module"
      ],
      "requestBody": {
          "description": "Add education Info",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "stepsToCreate": {
                    "type": "string"
                  },
                  "stackTrace": {
                    "type": "string"
                  },
                  "devInfo": {
                    "type": "string"
                  },
                  "reporterInfo": {
                    "type": "string"
                  },
                  "labels": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "CreateIssue": {
                    "value": {
                      "message": "Issue create success"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Request API Not Found!!"
          },
          
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "CreateIssue": {
                    "value": {
                      "message": "***"
                    }
                  }
                }
              }
            }
          }
        },
    }
  }
};
export default RoutesRegistry;
