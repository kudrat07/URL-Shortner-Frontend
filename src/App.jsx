import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LinksPage from "./pages/LinksPage/LinksPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";

const App = () => {

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/links/:id"
            element={
              <ProtectedRoute>
                <LinksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics/:id"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/setting/:id"
            element={
              <ProtectedRoute>
                <SettingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
