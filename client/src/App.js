import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Post from "./Post";
import "./App.css";
import Layout from "./Layout";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
