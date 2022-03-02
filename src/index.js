import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import { AppConfig } from "./config";
import { UseWalletProvider } from "use-wallet";

console.log(AppConfig.chainId)
ReactDOM.render(
  <UseWalletProvider chainId={AppConfig.chainId}>
    <App />
  </UseWalletProvider>,
  document.getElementById("root")
);
