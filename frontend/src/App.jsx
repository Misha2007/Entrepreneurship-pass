import "./App.css";
import AuthWrapper from "./components/AuthWrapper";
import SignUp from "./components/SignUp";
import { Route, Routes, useNavigate, Router } from "react-router-dom";
import Home from "./pages/home";
import Account from "./components/Account";

function App() {
  return (
    <>
      <div>
        <AuthWrapper />
      </div>
      
        <Home />
      {/* <div>
        <AuthWrapper />
      </div> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
