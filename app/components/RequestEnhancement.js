import { AppContainerLayout, CoreLayoutItem } from "@wrappid/core";

import ReportIssueForm from "./ReportIssueForm";

export default function RequestEnhancement() {
  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <ReportIssueForm labels={[{ label: "Enhancement Request" }]} />
      </CoreLayoutItem>
    </>
  );
}
