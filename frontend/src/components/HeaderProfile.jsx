import { FaChevronUp } from "react-icons/fa";
import "./Header.css";
import { IoMdExit } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const HeaderProfile = (props) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div id="popup-header">
      <div style={{ textAlign: "end" }}>
        <FaChevronUp
          onClick={() => props.setIsHeaderProfile((prev) => !prev)}
        />
      </div>
      <div className="flexCentered">
        <img src="/assets/pictures/profileImage.png" alt="" />
        <span className="robot18">Mari Maasik</span>
        <div style={{ textAlign: "left" }}>
          <br />
          <p>Tõrva, Valgamaa</p>
          <p>Mari.maasik@gmail.com</p>
          <br />
          <p>
            <strong>Teated:</strong> 2 UUT
          </p>
          <p>Uuenda passi</p>
          <p>Muuda profiili</p>
          <br />
          <div className="flexCenteredRow exSet">
            <HiAdjustmentsHorizontal />
            <IoMdExit onClick={logoutHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfile;
