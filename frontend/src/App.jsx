import { useState } from "react";
import "./App.css";
import { Router, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <div>
      <AuthWrapper />
    </div>
  );
}

export default App;
