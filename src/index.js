import React from "react";
import ReactDOM from "react-dom";

import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthStore } from './contexts/AuthStore';


ReactDOM.render(
  <Router>
     <AuthStore>
      <App />
    </AuthStore>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();