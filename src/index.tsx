import React from "react";
import { createRoot } from "react-dom/client";
import App from "components/App/App";
import reportWebVitals from "reportWebVitals";
import "./styles/main.scss";
import Web3Provider from "@fewcha/web3-react";
import {Provider} from "react-redux";
import store from "components/App/store";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Web3Provider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Web3Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
