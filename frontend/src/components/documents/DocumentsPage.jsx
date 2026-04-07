import { useState, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./DocumentsPage.css";

const DocumentsPage = (props) => {
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
      <h1>Dokumendid</h1>
      <div className="documents">
        <div className="doc desc create">
          <FiPlusCircle />
          <p className="logo" style={{ color: "#000" }}>
            Lisa uus kogemus
          </p>
        </div>
        <div className="doc">
          <div className="status">
            <img src="/assets/icons/tickPink.svg" alt="" />
            <span className="robot16">OOTAB KINNITUST</span>
          </div>
          <div className="desc">
            <p className="title logo">Vabatahtlik töö</p>
            <button>Vaata rohkem</button>
            <hr />
          </div>
        </div>
        <div className="doc">
          <div className="status">
            <img src="/assets/icons/tickPink.svg" alt="" />
            <span className="robot16">OOTAB KINNITUST</span>
          </div>
          <div className="desc">
            <p className="title logo">Vabatahtlik töö</p>
            <button>Vaata rohkem</button>
            <hr />
          </div>
        </div>
        <div className="doc">
          <div className="status">
            <img src="/assets/icons/tickPink.svg" alt="" />
            <span className="robot16">OOTAB KINNITUST</span>
          </div>
          <div className="desc">
            <p className="title logo">Vabatahtlik töö</p>
            <button>Vaata rohkem</button>
            <hr />
          </div>
        </div>
        <div className="doc">
          <div className="status">
            <img src="/assets/icons/tickPink.svg" alt="" />
            <span className="robot16">OOTAB KINNITUST</span>
          </div>
          <div className="desc">
            <p className="title logo">Vabatahtlik töö</p>
            <button>Vaata rohkem</button>
            <hr />
          </div>
        </div>
        <div className="doc">
          <div className="status">
            <img src="/assets/icons/tickPink.svg" alt="" />
            <span className="robot16">OOTAB KINNITUST</span>
          </div>
          <div className="desc">
            <p className="title logo">Vabatahtlik töö</p>
            <button>Vaata rohkem</button>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
