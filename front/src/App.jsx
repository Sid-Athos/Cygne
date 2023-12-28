import './App.css'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from 'react-router-dom';

import ContractForm from './form.jsx'
import ResponsiveAppBar from "./navbar.jsx";


function App() {

  const router = createBrowserRouter(
      createRoutesFromElements([
          <Route path="/" element={<ContractForm />} />,
          <Route path="/teachers" element={<ContractForm />} />]
      )
  );

  return (
      <>


        <RouterProvider router={router} />
      </>

  )
}

export default App
