import "./App.css";
import AuthWrapper from "./components/AuthWrapper";
import SignUp from "./components/SignUp";
import AuthCallback from "./components/AuthCallback";
import { Route, Routes, useNavigate, Router } from "react-router-dom";
import Home from "./pages/home";
import Account from "./components/Account";
import DonePass from "./components/documents/DonePass";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/passport/:id" element={<DonePass />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

export default App;
