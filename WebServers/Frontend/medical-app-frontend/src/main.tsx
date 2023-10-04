import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'


import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './AdminDashboard/styles/Admin.scss'
import './AdminDashboard/styles/Changer.scss'
import './AdminDashboard/styles/Login.scss'
import {ThemeProvider} from "@gravity-ui/uikit";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const storeAdmin = store();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={storeAdmin}>
          <ThemeProvider theme="light">
            <App />
          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
)
