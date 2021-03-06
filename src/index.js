import "./index.scss";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import "react-virtualized/styles.css";
import { Provider } from "react-redux";
import store from "./store/configureStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
