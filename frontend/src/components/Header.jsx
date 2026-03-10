import { FaChevronDown } from "react-icons/fa";
import "./Header.css";

const Header = (props) => {
  return (
    <div id="header-auth">
      <span className="logo">ETTEVÕTLIKKUSE PASS</span>
      <div className="buttons">
        <img src="/assets/pictures/profileImage.png" alt="" />
        <span className="robot18">Tere, Mari</span>
        <FaChevronDown />
      </div>
    </div>
  );
};

export default Header;
