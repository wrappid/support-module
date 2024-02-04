import {
  FORM_IDS,
  FORM_EDIT_MODE,
  CoreForm,
  CoreCardContent,
  CoreCard,
  getFullName,
  config
} from "@wrappid/core";
import {
  browserName,
  deviceType,
  fullBrowserVersion,
  isMobile,
  mobileModel,
  mobileVendor,
  osName,
  osVersion
} from "react-device-detect";
import { useSelector } from "react-redux";

// -- import { ApplicationRegistry } from "../../../../ApplicationRegistry";

export default function ReportIssueForm(props) {
  const { title, isStacktrace = true, stackTrace, labels } = props;
  const { apiVersion } = useSelector((state) => state.app);
  const { role } = useSelector((state) => state.auth);
  const { basic, contact } = useSelector((state) => state.profile);

  return (
    <CoreCard>
      <CoreCardContent>
        <CoreForm
          formId={FORM_IDS.__CREATE_ISSUE}
          authenticated={false}
          mode={FORM_EDIT_MODE}
          initData={{
            devInfo: JSON.stringify({
              backend: {
                url:
                  process.env.REACT_APP_WRAPPID_backendUrl ||
                  config?.wrappid?.backendUrl,
                version: apiVersion?.version || "unknown",
              },
              client: {
                browser: `${browserName} Ver: ${fullBrowserVersion}`,
                device : `${deviceType}${
                  isMobile ? " " + mobileVendor + " " + mobileModel : ""
                }`,
                os       : `${osName} Ver: ${osVersion}`,
                userAgent: navigator.userAgent,
              },
              frontend: {
                url: window.location.href,
                // -- version: ApplicationRegistry.version,
              },
            }),
            isStacktrace: isStacktrace,
            labels      : labels,
            reporterInfo: JSON.stringify({
              creationTime: new Date().toLocaleString(),
              email       : contact?.email,
              name        : getFullName(basic),
              phone       : contact?.phone,
              role        : role?.role,
            }),
            stackTrace: stackTrace,
            title     : title,
          }}
        />
      </CoreCardContent>
    </CoreCard>
  );
}
