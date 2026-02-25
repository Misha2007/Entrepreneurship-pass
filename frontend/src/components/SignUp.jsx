// import "./SignUp.css";
import { useState, useRef } from "react";

const SignUp = (props) => {
  const [error, setError] = useState(null);

  const firstNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfInputRef = useRef();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const errorHandler = () => {
    setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
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
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConf = passwordConfInputRef.current.value;
    const rememberMeValue = rememberMe;
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
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    passwordConfInputRef.current.value = "";
  };

  return (
    <form onSubmit={sumbitHandler}>
      <div className="form-group">
        <div className="input-container">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Eesnimi"
            required
            ref={firstNameInputRef}
          />
          <label htmlFor="firstName">Eesnimi</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Perekonnanimi"
            required
            ref={firstNameInputRef}
          />
          <label htmlFor="lastName">Perekonnanimi</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="birth"
            name="birth"
            placeholder="pp/kk/aaaa"
            required
            ref={firstNameInputRef}
          />
          <label htmlFor="birth">Sünniaeg</label>
        </div>

        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
            ref={emailInputRef}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Parool"
            required
            ref={passwordInputRef}
          />
          <label htmlFor="password">Parool</label>
        </div>

        <div className="remember-container">
          <div>
            <input
              type="checkbox"
              id="remember_me"
              name="remember_me"
              onClick={toggleRememberMe}
            />
            <label htmlFor="remember_me">Remember me</label>
          </div>
        </div>

        <button type="submit" className="login_button">
          Login
        </button>
      </div>
    </form>
  );
};

export default SignUp;
