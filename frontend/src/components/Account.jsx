import "./Account.css";
import { useState, useRef } from "react";
import DocumentsPage from "./documents/DocumentsPage";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegIdCard } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Header from "./Header";
import NewExp from "./documents/NewExp";
import Pass from "./documents/Pass";
import Settings from "./documents/Settings";

const sections = [
  {
    key: "documents",
    icon: <AiOutlineFolderOpen />,
    label: "Dokumendid",
    component: <DocumentsPage size={32} />,
  },
  {
    key: "new-exp",
    icon: <FiPlusCircle />,
    label: "Uus kogemus",
    component: <NewExp />,
  },
  {
    key: "passport",
    icon: <FaRegIdCard />,
    label: "Pass",
    component: <Pass />,
  },
  {
    key: "drafts",
    icon: <FaRegEdit />,
    label: "Mustandid",
    component: <DocumentsPage />,
  },
  {
    key: "trash",
    icon: <FaRegTrashAlt />,
    label: "Prügikast",
    component: <DocumentsPage />,
  },
  {
    key: "settings",
    icon: <HiAdjustmentsHorizontal />,
    label: "Seaded",
    component: <Settings />,
  },
];

const Account = (props) => {
  const [openSection, setOpenSection] = useState("documents");

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
    <>
      <Header />
      <div className="acc">
        <div id="sections-container">
          <ol className="sections">
            {sections.map((section) => (
              <li
                key={section.key}
                className={openSection === section.key ? "active" : ""}
                onClick={() => setOpenSection(section.key)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  {section.icon}
                  <p className="robot18">{section.label}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="section-container" style={{ color: "#000" }}>
          {sections.map(
            (section) =>
              openSection === section.key && (
                <div key={section.key}>{section.component}</div>
              ),
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
