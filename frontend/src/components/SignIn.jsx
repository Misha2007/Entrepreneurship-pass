import "./SignUp.css";
import { useState, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

const SignIn = (props) => {
  const [error, setError] = useState(null);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const birthInputRef = useRef();
  const passwordInputRef = useRef();

  const errorHandler = () => {
    setError(null);
  };

  const saveUserDataHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData,
    };
    props.onAddUser(userData);
  };

  const sumbitHandler = (event) => {
    event.preventDefault();
    console.log("sjadlkjasdsajd");
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredBirth = birthInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    event.preventDefault();

    if (
      enteredFirstName.trim().length == 0 ||
      enteredLastName.trim().length == 0 ||
      enteredEmail.trim().length == 0 ||
      enteredBirth.trim().length == 0 ||
      enteredPassword.trim().length == 0
    ) {
      setError({
        title: "Invalid input",
        message:
          "Please enter a valid name or email or password (non-empty values)",
      });
      return;
    }

    const userData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      birth: enteredBirth,
      email: enteredEmail,
      password: enteredPassword,
    };

    saveUserDataHandler(userData);
    firstNameInputRef.current.value = "";
    lastNameInputRef.current.value = "";
    emailInputRef.current.value = "";
    birthInputRef.current.value = "";
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
          <p>Voi</p>
          <div style={{ gap: "32px", display: "flex" }}>
            <img src="/assets/pictures/google.png" alt="" />
            <img src="/assets/pictures/smartId.png" alt="" />
            <img src="/assets/pictures/mobId.png" alt="" />
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
