import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MetaMaskProvider } from '@metamask/sdk-react';
import {  ThirdwebProvider } from "@thirdweb-dev/react";

import { Sepolia } from "@thirdweb-dev/chains";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import ContractForm from "./form.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThirdwebProvider activeChain={Sepolia}>
      <MetaMaskProvider debug={false} sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
              name: "Demo React App",
              url: window.location.host,
          }
      }}>
      <Router>
        <App></App>
          <Routes>

          <Route path="/" element={<ContractForm />} />
          <Route path="/teachers" element={<ContractForm />} />
          </Routes>
      </Router>
      </MetaMaskProvider>
      </ThirdwebProvider>
  </React.StrictMode>,
)
