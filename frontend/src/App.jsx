import { useState } from "react";
import "./App.css";
import { Router, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthWrapper from "./components/AuthWrapper";
import SignUp from "./components/SignUp";
import Home from "./pages/home";



function App() {
  return (
    <>
      <div>
        <AuthWrapper />
      </div>
      
        <Home />
    </>
  );
}

export default App;
