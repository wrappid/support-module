import { AppContainerLayout, CoreLayoutItem } from "@wrappid/core";

import ReportIssueForm from "./ReportIssueForm";

export default function ReportBug() {
  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <ReportIssueForm labels={[{ label: "Bug" }]} />
      </CoreLayoutItem>
    </>
  );
}
