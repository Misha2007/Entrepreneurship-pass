import groupImage from "/assets/pictures/group2.png";
import "../style/home.css";
import { RiHandCoinFill } from "react-icons/ri";
import { IoFolder } from "react-icons/io5";
import { RiMedalLine } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import { TbFileArrowRight } from "react-icons/tb";
import { useState, useEffect } from "react";
import AuthWrapper from "../components/AuthWrapper";

function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSingup, setIsSingup] = useState(false);
  useEffect(() => {
    console.log(isSingup);
  }, [isSingup]);

  const closeModal = () => {
    setIsSingup(false);
    setIsLogin(false);
  };
  return (
    <div className="whatever">
      {isSingup && <AuthWrapper closeModal={closeModal} />}
      <div className="blacktab">
        <div className="whitetab">
          <span className="title">ETTEVÕTLIKKUSE PASS</span>
          <div className="buttons">
            <button className="login">Logi sisse</button>
            <button
              className="register"
              onClick={() => {
                setIsSingup(true);
              }}
            >
              Registreeru
            </button>
          </div>
        </div>
      </div>

      <div className="image-wrapper">
        <img className="groupimg" src={groupImage} alt="Friendly picture" />
      </div>

      <div className="icons">
        <div>
          <img src="/assets/icons/book.png" alt="" />
          <p>Õpi</p>
        </div>
        <img src="/assets/icons/Union.png" alt="" />
        <div>
          <img src="/assets/icons/file.png" alt="" />
          <p>Dokumenteeri</p>
        </div>
        <img src="/assets/icons/Union(1).png" alt="" />
        <div>
          <img src="/assets/icons/Frame 118.png" alt="" />
          <p>Kandideeri</p>
        </div>
      </div>

      <section id="main-part">
        <h1>
          <span>Ettevõtlikkuse pass</span> kaasaegne ja praktiline
          veebiplatvorm, mis aitab noortel koguda, analüüsida ja tõendada oma
          ettevõtlikke kogemusi.
        </h1>
        <div className="c">
          <div className="container">
            <h2>Platvormi funktsioonid</h2>
            <div>
              <ul>
                <li>
                  <RiHandCoinFill />
                  Koolita ja Õpi
                </li>
                <li>
                  <IoFolder />
                  Dokumenteeri
                </li>
                <li>
                  <RiMedalLine />
                  Motveeriv punktisüsteem
                </li>
                <li>
                  <RiShieldUserFill />
                  Administraatori kinnitus
                </li>
                <li>
                  <TbFileArrowRight /> Kandideeri
                </li>
              </ul>
              <img src="/assets/pictures/ptvFunc.png" alt="" />
            </div>
          </div>
        </div>
        <div className="c" id="partners">
          <div className="container">
            <h2>Meie Sõbrad</h2>
            <div id="partners-images">
              <img src="/assets/pictures/voco.png" alt="" />
              <img src="/assets/pictures/leen.png" alt="" />
              <img src="/assets/pictures/kutsekoda.png" alt="" />
              <img src="/assets/pictures/eu_commission.png" alt="" />
            </div>
          </div>
        </div>
        <div className="c" id="avasta">
          <div className="container">
            <h2>Avasta rohkem liitudes Meie platvormiga</h2>
            <div className="register-avasta">
              <button>Registreeri</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
