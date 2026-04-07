import { useState, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./Pass.css";
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

const Pass = (props) => {
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
    <div className="documents-container pass-container">
      <h1>Ettevõtlikuse pass</h1>
      <div className="pass-header">
        <div className="doc">
          <h3>Mari Maasik</h3>
          <p>Valgamaa, Tõrva mari.maasik@gmail.com</p>
          <p>mari.maasik@gmail.com</p>
        </div>
        <div className="prof-img">
          <img src="/assets/pictures/profileImage.png" alt="" />
          <FaPlusCircle size={50} />
        </div>
      </div>
      <table className="exps-pass">
        <tr>
          <th>
            <h2>Kogemus</h2>
          </th>
          <th>
            <h2>Kategooria</h2>
          </th>
          <th>
            <h2>Kuupäev</h2>
          </th>
          <th>
            <h2>Tegevus</h2>
          </th>
        </tr>

        <tr>
          <td>Erasmus +</td>
          <td>03.2025</td>
          <td>
            <FaToggleOn size={35} />
          </td>
        </tr>

        <tr>
          <td>Vabatahtlik töö</td>
          <td>180 h</td>
          <td>
            <FaToggleOn size={35} />
          </td>
        </tr>

        <tr>
          <td>Koolitus</td>
          <td>02.-04.2025</td>
          <td>
            <FaToggleOn size={35} />
          </td>
        </tr>

        <tr>
          <td>Koolitus</td>
          <td>02.-12.2025</td>
          <td>
            <FaToggleOff size={35} />
          </td>
        </tr>

        <tr>
          <td>Üritused</td>
          <td>12.12.2025</td>
          <td>
            <FaToggleOn size={35} />
          </td>
        </tr>

        <tr>
          <td>Vabatahtlik töö</td>
          <td>17.11.2025</td>
          <td>
            <FaToggleOn size={35} />
          </td>
        </tr>
      </table>
      <h2>Refleksioon</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>Loe edasi..</p>
      <div className="buttons">
        <button>Ekspordi</button>
        <button className="white">Mustand</button>
      </div>
    </div>
  );
};

export default Pass;
