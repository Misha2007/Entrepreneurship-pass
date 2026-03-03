import "./SignUp.css";
import { useState, useRef, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const AuthWrapper = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMsg = params.get("error");
    if (errorMsg) {
      setError({ message: errorMsg });
    }
  }, [location.search]);

  const handleCloseError = () => {
    setError(null);
  };

  const addUserHandler = (user) => {
    const addUser = async (user) => {
      try {
        console.log(JSON.stringify(user));
        const response = await fetch(`${VITE_API_URL}users/new-user`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        localStorage.setItem("authToken", data.accessToken);
        if (!response.ok) {
          const errorMessage = await response.text();
          setError({
            title: "Problems with backend",
            message: errorMessage || "Invalid email or password.",
          });
          return;
        }
      } catch (error) {
        console.log(error);
        setError({
          title: "Server Unreachable",
          message: "Failed to add user, please try again later.",
        });
        return;
      }
    };
    addUser(user);
  };

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <div className="signup-header">
          <h1>ETTEVÕTLIKKUSE PASS</h1>
          <FaXmark size={40} color="#000" />
        </div>
        <SignUp onAddUser={addUserHandler} closeModal={props.closeModal} />
      </div>
    </div>
  );
};

export default AuthWrapper;
