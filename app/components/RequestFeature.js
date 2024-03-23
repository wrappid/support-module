import { AppContainerLayout, CoreLayoutItem } from "@wrappid/core";

import ReportIssueForm from "./ReportIssueForm";

export default function RequestFeature() {
  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <ReportIssueForm labels={[{ label: "Feature Request" }]} />
      </CoreLayoutItem>
    </>
  );
}
