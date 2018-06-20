import React from "react";
import ReactDOM from "react-dom";

import { LocaleProvider } from "antd";
import koKr from "antd/lib/locale-provider/ko_KR";
import registerServiceWorker from "registerServiceWorker";

import App from "containers/App";

ReactDOM.render(
  <LocaleProvider locale={koKr}>
    <App />
  </LocaleProvider>,
  document.getElementById("root")
);
registerServiceWorker();
