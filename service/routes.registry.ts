const RoutesRegistry = {
  createIssueReport: {
    name: "Create Issue Github",
    url: "noauth/issue/create",
    authRequired: false,
    entityRef: "createIssueReport",
    reqMethod: "post",
    controllerRef: "createIssueReport"
  }
};
export default RoutesRegistry;
