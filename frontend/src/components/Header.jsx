import { FaChevronDown } from "react-icons/fa";
import "./Header.css";
import HeaderProfile from "./HeaderProfile.jsx";
import { useState } from "react";

const Header = (props) => {
  const [isHeaderProfile, setIsHeaderProfile] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     logoutHandler();
  //   }
  // }, []);

  return (
    <div id="header-auth">
      <span className="logo">ETTEVÕTLIKKUSE PASS</span>
      <div className="buttons">
        {isHeaderProfile && (
          <HeaderProfile setIsHeaderProfile={setIsHeaderProfile} />
        )}

        <img src="/assets/pictures/profileImage.png" alt="" />
        <span className="robot18">Tere, Mari</span>
        <FaChevronDown onClick={() => setIsHeaderProfile((prev) => !prev)} />
      </div>
    </div>
  );
};

export default Header;
