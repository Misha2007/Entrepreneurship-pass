import "./SignUp.css";
import { useState, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import { supabase } from "../lib/supabase";

// const { VITE_API_URL } = import.meta.env;


const SignIn = (props) => {

  // const { data } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  //   options: {
  //     redirectTo: "http://localhost:5173/auth/callback"
  //   }
  // });
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
          scopes: "email profile https://www.googleapis.com/auth/user.birthday.read",
          redirectTo: "http://192.168.47.181:3001/auth/callback",
          provider: "google"
      }
    });

    if (error) {
      console.error(error);
    }
  };

  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const errorHandler = () => {
    setError(null);
  };

  const saveUserDataHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData,
    };
    props.onLoginUser(userData);
  };

  const sumbitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    event.preventDefault();

    if (enteredEmail.trim().length == 0 || enteredPassword.trim().length == 0) {
      setError({
        title: "Invalid input",
        message:
          "Please enter a valid name or email or password (non-empty values)",
      });
      return;
    }

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    saveUserDataHandler(userData);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <div className="signup-header">
          <h1>ETTEVÕTLIKKUSE PASS</h1>
          <FaXmark
            size={40}
            color="#000"
            onClick={props.closeModal}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form onSubmit={sumbitHandler}>
          <div className="form-group">
            <h2>Logi sisse</h2>

            <div className="input-container">
              <label htmlFor="email">Email</label>

              <input
                className="robot20"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required
                ref={emailInputRef}
              />
            </div>

            <div className="input-container">
              <label htmlFor="password">Parool</label>

              <input
                className="robot20"
                type="password"
                id="password"
                name="password"
                placeholder="Parool"
                required
                ref={passwordInputRef}
              />
            </div>
          </div>
          <button type="submit" className="signupbtn">
            Logi sisse
          </button>
        </form>
        <div
          className="flexCentered robot20"
          style={{ color: "#000", fontWeight: "bold" }}
        >
          <p>Või</p>
            <div style={{ gap: "32px", display: "flex" }}>
              <img
                src="/assets/pictures/google.png"
                alt="Sign in with Google"
                style={{ cursor: "pointer" }}
                onClick={handleGoogleLogin}
              />

              <img src="/assets/pictures/smartId.png" alt="Smart ID" />
              <img src="/assets/pictures/mobId.png" alt="Mobile ID" />
            </div>
          <p>Pole veel kasutaja?</p>
          <p>
            Registreeri end{" "}
            <a
              href="#"
              style={{ fontWeight: "lighter" }}
              onClick={() => {
                props.setIsLogin(false);
                props.setIsSingup(true);
              }}
            >
              siin.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
