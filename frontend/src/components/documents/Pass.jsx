import { useState, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./Pass.css";
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const Pass = (props) => {
  const [error, setError] = useState(null);

  const [exps, setExps] = useState([]);

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    const getExps = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}exps/get-exps`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }
        const data = await response.json();
        console.log("Fetched experiences:", data);
        setExps(data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };

    getExps();
  }, []);

  const exportPass = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}passports/new-pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          expIds: expsIncluded,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch experiences");
      }
      const data = await response.json();
      console.log("Fetched password:", data);
      redirect(`/passport/${data.passport.id}`);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
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
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <table className="exps-pass">
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 1,
            }}
          >
            <tr>
              <th>
                <h2>Kogemused</h2>
              </th>
              <th>
                <h2>Kuupäev/maht</h2>
              </th>
              <th>
                <h2>Näitan / Ei näita</h2>
              </th>
            </tr>
          </thead>
          {exps.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.type}</td>
              <td>
                {(() => {
                  const d = new Date(exp.date);
                  const day = String(d.getDate()).padStart(2, "0");
                  const month = String(d.getMonth() + 1).padStart(2, "0");
                  const year = d.getFullYear();

                  return `${day}.${month}.${year}`;
                })()}
              </td>
              <td>
                {/* {exp.visible ? (
                <FaToggleOn size={35} />
              ) : (
                <FaToggleOff size={35} />
              )} */}
                <FaToggleOff size={35} />
              </td>
            </tr>
          ))}
        </table>
      </div>
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
