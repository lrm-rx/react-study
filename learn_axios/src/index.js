import React from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';
import App from './App'

// 7. 默认配置
axios.defaults.baseURL = "https://httpbin.org";
axios.defaults.timeout = 5000;
axios.defaults.headers.common["token"] = "4ef881c0-f8ce-412a-9669-3c8c9e904120";
// axios.defaults.headers.post["Content-Type"] = "application/text";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
);
