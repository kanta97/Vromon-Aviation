import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import { reducer as toastrReducer } from "react-redux-toastr";

import userReducer from "./store/reducers/userReducer";
import axios from "axios";
//process.env.BASEURLAUTH

axios.defaults.baseURL = "https://navigatortourism.com:8085";
//axios.defaults.baseURL = "http://localhost:8085";

// axios.defaults.baseURL = ' https://stage.navigatortourism.com:8083';

const rootReducer = combineReducers({
  auth: authReducer,
  userReducer: userReducer,
  toastr: toastrReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
