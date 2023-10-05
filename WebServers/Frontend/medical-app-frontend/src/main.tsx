import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'


import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './AdminDashboard/styles/Admin.scss'
import './AdminDashboard/styles/Changer.scss'
import './AdminDashboard/styles/Login.scss'
import "./AdminDashboard/styles/AdminHeader.scss"

import {Provider} from "react-redux";
import {store} from "./store/store.ts";


const storeAdmin = store();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={storeAdmin}>
            <App />
      </Provider>
  </React.StrictMode>,
)
