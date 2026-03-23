import { useState, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./Exp.css";
import { MdOutlineLink } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";

const NewExp = (props) => {
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
      <h1>Lisa uus kogemus</h1>
      <form className="exps">
        <div className="doc">
          <label htmlFor="">Vali tüüp</label>
          <select name="" id="">
            <option value="volonteer">Vabatahtlik töö</option>
            <option value="ErasmusInternship">Erasmus+ praktika</option>
            <option value="training">Koolitus</option>
            <option value="event">Üritus</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Ettevõte / Üritus</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="" placeholder="pp / kk / aaaa">
            Kuupäev
          </label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Maht</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Reflektsioon</label>
          <textarea
            type="text"
            placeholder="Mis sa tegid? Mis oli sinu jaoks õpetlik? Mis oli keeruline? Mida kasutad tulevikus?"
          />
        </div>
        <div className="addfile">
          <label htmlFor="">Lisa fail</label>
          <div className="input-file-container">
            <div>
              <MdOutlineLink color="#fff" size={25} />
            </div>

            <input type="link" placeholder="Lisa URL" />
          </div>
          <div className="input-file-container">
            <div>
              <RiAttachment2 color="#fff" size={25} />
            </div>
            <input type="file" />
          </div>
        </div>
        <div>
          <label htmlFor="">Juhendaja e-post</label>
          <input type="text" />
        </div>
        <div className="buttons">
          <button>Saada juhendajale</button>
          <button className="white">Salvesta mustand</button>
        </div>
      </form>
    </div>
  );
};

export default NewExp;
