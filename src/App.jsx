import React from 'react';
import './App.css'
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import DashboardPage from './pages/DashboardPage/DashboardPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<RegisterPage/>} />
            <Route path='/' element={<LoginPage/>} />
            
            <Route path='/dashboard/:id' element={<DashboardPage/>} />
          </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  )
}

export default App;