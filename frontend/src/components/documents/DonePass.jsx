import { useState, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./DonePass.css";
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect } from "react";
import { redirect, useParams } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const DonePass = (props) => {
  const { id } = useParams();
  const [error, setError] = useState(null);

  const [exps, setExps] = useState([]);
  const [user, setUser] = useState({});

  const [expsIncluded, setExpsIncluded] = useState([]);

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    const getExps = async () => {
      try {
        const response = await fetch(
          `${VITE_API_URL}passports/get-pass/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }
        const data = await response.json();
        console.log("Fetched experiences:", data);
        const flattenedExps = data.data.map((item) => item.experience);
        setExps(flattenedExps);
        setUser(flattenedExps[0].user);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };

    getExps();
  }, []);

  return (
    <div className="documents-container pass-container" id="exported-pass">
      {exps.length && (
        <>
          <h1 style={{ textAlign: "center" }}>Ettevõtlikuse pass</h1>
          <div className="pass-header">
            <div className="prof-img">
              <img src="/assets/pictures/profileImage.png" alt="" />
            </div>
            <div>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div>
                <p>
                  {(() => {
                    const d = new Date(user.birth);
                    const day = String(d.getDate()).padStart(2, "0");
                    const month = String(d.getMonth() + 1).padStart(2, "0");
                    const year = d.getFullYear();

                    return `${day}.${month}.${year}`;
                  })()}
                </p>
                <p>{user.residency}</p>
              </div>
            </div>
          </div>
          <hr color="#7BE96D" />
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
                </tr>
              ))}
            </table>
          </div>
          <hr color="#62E5F4" />

          <div>
            <h2>Lisa failid, dokumendid ja pildid</h2>
            <table className="exps-pass">
              {exps
                .filter((exp) => exp.fileUrl)
                .map((exp) => (
                  <tr key={exp.id}>
                    <td>
                      <a href={exp.fileUrl} target="_blank">
                        {(() => {
                          const parts = exp.fileUrl.split("/");
                          const filename = parts[parts.length - 1];
                          console.log(filename);
                          return filename;
                        })()}
                      </a>
                    </td>
                    <td>{exp.type}</td>
                  </tr>
                ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DonePass;
