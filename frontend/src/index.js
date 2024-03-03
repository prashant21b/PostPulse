import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {App} from "./App";
import { BrowserRouter } from "react-router-dom";
import Toaster from 'react-hot-toast'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <App />
  <Toaster/>
  </Provider>
   
  </BrowserRouter>
);
