import "./SignUp.css";
import { useState, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

const SignUp = (props) => {
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
    console.log("Register form submitted");
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
          <h1 className="logo">ETTEVÕTLIKKUSE PASS</h1>
          <FaXmark
            size={40}
            color="#000"
            onClick={props.closeModal}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form onSubmit={sumbitHandler}>
          <div className="form-group">
            <h2>Registreeri</h2>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div className="input-container" style={{ width: "100%" }}>
                <label htmlFor="firstName">Eesnimi</label>

                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Eesnimi"
                  required
                  ref={firstNameInputRef}
                />
              </div>

              <div className="input-container" style={{ width: "100%" }}>
                <label htmlFor="lastName">Perekonnanimi</label>

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Perekonnanimi"
                  required
                  ref={lastNameInputRef}
                />
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="birth">Sünniaeg</label>

              <input
                type="date"
                id="birth"
                name="birth"
                placeholder="pp/kk/aaaa"
                required
                ref={birthInputRef}
              />
            </div>

            <div className="input-container">
              <label htmlFor="email">Email</label>

              <input
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
            Registreeri
          </button>
        </form>
        <div id="login-screen" className="hidden">
          <button id="login-btn">Login with Google</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
