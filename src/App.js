import React from "react";
// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import FlareLane from "@flarelane/flarelane-web-sdk";

// ----------------------------------------------------------------------
FlareLane.initialize({
  projectId: "d9873220-bd4d-41c2-afeb-d658575e920d",
  serviceWorkerPath: "/sw.js",
});

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
