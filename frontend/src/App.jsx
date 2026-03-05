import { useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Account from "./components/Account";

function App() {
  return (
    <>
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
