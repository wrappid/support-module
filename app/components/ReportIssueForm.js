import React from "react";

import {
  AppContainerLayout,
  CoreCard, CoreCardContent,
  CoreForm, CoreLayoutItem, FORM_EDIT_MODE,
  FORM_IDS
} from "@wrappid/core";
import { WrappidDataContext } from "@wrappid/styles";
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

/**
 * @todo this package json is core's
 * should be the package json of user application
 */

import { getFullName, getLabel } from "../utils/app.utils";

export default function ReportIssueForm(props) {
  const { title, isStacktrace = true, stackTrace, labels } = props;
  const { config } = React.useContext(WrappidDataContext);
  const { packageInfo: packageJSON } = config;
  const { apiVersion } = useSelector((state) => state.app);
  const { role } = useSelector((state) => state.auth?.role || {});
  const profile = useSelector((state) => state.profile);
  const basic = profile?.basic;
  const contact = profile?.contact;

  return (
    <>
      <CoreLayoutItem id={AppContainerLayout.PLACEHOLDER.CONTENT}>
        <CoreCard>
          <CoreCardContent>
            <CoreForm
              formId={FORM_IDS.__CREATE_ISSUE}
              authenticated={false}
              mode={FORM_EDIT_MODE}
              initData={{
                devInfo: JSON.stringify({
                  backend: { version: apiVersion?.version || "unknown" },
                  client : {
                    browser: `${browserName} Ver: ${fullBrowserVersion}`,
                    device : `${getLabel(deviceType)}${
                      isMobile ? " " + mobileVendor + " " + mobileModel : ""
                    }`,
                    os       : `${osName} Ver: ${osVersion}`,
                    userAgent: navigator?.userAgent,
                  },
                  frontend: {
                    url    : window?.location?.href,
                    version: packageJSON?.version,
                  },
                }),
                isStacktrace: isStacktrace,
                labels      : labels,
                reporterInfo: JSON.stringify({
                  creationTime: new Date().toLocaleString(),
                  email       : contact?.email,
                  name        : getFullName(basic),
                  phone       : contact?.phone,
                  role        : role || "unknown",
                }),
                stackTrace: stackTrace,
                title     : title,
              }}
            />
          </CoreCardContent>
        </CoreCard>
      </CoreLayoutItem>
    </>
  );
}
