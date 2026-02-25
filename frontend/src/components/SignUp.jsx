import "./SignUp.css";
import { useState, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

const SignUp = (props) => {
  const [error, setError] = useState(null);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfInputRef = useRef();

  const errorHandler = () => {
    setError(null);
  };

  const saveUserDataHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData,
      id: Math.random().toString(),
    };
    props.onAddUser(userData);
  };

  const sumbitHandler = (event) => {
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConf = passwordConfInputRef.current.value;
    event.preventDefault();

    if (
      enteredFirstName.trim().length == 0 ||
      enteredEmail.trim().length == 0 ||
      enteredPassword.trim().length == 0 ||
      enteredPasswordConf.trim().length == 0
    ) {
      console.log(enteredPasswordConf);
      console.log(enteredPassword);
      setError({
        title: "Invalid input",
        message:
          "Please enter a valid name or email or password (non-empty values)",
      });
      return;
    }

    if (enteredPasswordConf != enteredPassword) {
      setError({
        title: "Invalid input",
        message: "Your passwords are not matching. Please try again.",
      });
      return;
    }

    const userData = {
      firstName: enteredFirstName,
      email: enteredEmail,
      password: enteredPassword,
    };

    saveUserDataHandler(userData);
    firstNameInputRef.current.value = "";
    lastNameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    passwordConfInputRef.current.value = "";
  };

  return (
    <div class="signup-modal">
      <div className="signup-modal-content">
        <div className="signup-header">
          <h1>ETTEVÕTLIKKUSE PASS</h1>
          <FaXmark size={40} color="#000" />
        </div>
        <form onSubmit={sumbitHandler}>
          <div className="form-group">
            <h2>Registreeri</h2>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div className="input-container">
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

              <div className="input-container">
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
                ref={firstNameInputRef}
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
      </div>
    </div>
  );
};

export default SignUp;
