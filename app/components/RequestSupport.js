import ReportIssueForm from "./ReportIssueForm";

export default function RequestSupport() {
  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <ReportIssueForm labels={[{ label: "Support Request" }]} />
      </CoreLayoutItem>
    </>
  );
}
