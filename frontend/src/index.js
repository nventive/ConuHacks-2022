import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { DAppProvider, Ropsten} from "@usedapp/core";

const config = {
    readOnlyChainId: Ropsten.chainId,
    readOnlyUrls: {
        [Ropsten.chainId]: 'https://eth-ropsten.alchemyapi.io/v2/7SXH-5Awi-PXwykyzs82zwSjysQePayV',
    },
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <DAppProvider config={config}>
            <App />
        </DAppProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
