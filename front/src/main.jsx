import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MetaMaskProvider } from '@metamask/sdk-react';
import {  ThirdwebProvider } from "@thirdweb-dev/react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { Sepolia } from "@thirdweb-dev/chains";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import ContractForm from "./management.jsx";
import CourseDetail from "./CourseDetail.jsx";
import TeacherCourses from "./TeacherCourses.jsx";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});
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
          <ThemeProvider theme={darkTheme}>
      <Router>

        <App></App>
          <Routes>

          <Route path="/" element={<ContractForm />} />
          <Route path="/teachers" element={<ContractForm />} />
          <Route path="/teacher/:address/courses" element={<TeacherCourses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          </Routes>
      </Router>
          </ThemeProvider>

      </MetaMaskProvider>
      </ThirdwebProvider>
  </React.StrictMode>,
)
