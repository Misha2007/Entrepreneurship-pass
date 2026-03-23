import { useState, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./DocumentsPage.css";

const Experience = (props) => {
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
    <div className="documents-container">
      <h1>Kogemus</h1>
      <form className="documents">
        <div className="doc desc create">
          <select name="" id=""></select>
        </div>
        <div>
          <label htmlFor="">Ettevõte / Üritus</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Kuupäev</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Maht</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Reflektsioon</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Lisa fail</label>
          <input type="link" />
          <label htmlFor="">Lisa fail</label>
          <input type="file" />
        </div>
        <div>
          <label htmlFor="">Juhendaja e-post</label>
          <input type="text" />
        </div>
      </form>
    </div>
  );
};

export default Experience;
