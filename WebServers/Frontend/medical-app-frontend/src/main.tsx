import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'






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
