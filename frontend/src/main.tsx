import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./services/reduxStore.ts";
import {Provider} from "react-redux";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
)
