import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "./styles/Toaster.scss"





import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";



const storeAdmin = store();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>

        <Provider store={storeAdmin}>
            <ToasterProvider>
                <App />
                <ToasterComponent className="admin-toaster" />
            </ToasterProvider>
        </Provider>
    </React.StrictMode>,
)
