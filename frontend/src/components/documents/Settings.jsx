import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./Settings.css";

const { VITE_API_URL } = import.meta.env;

const Settings = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birth: "",
    email: "",
    phone: "",
    residency: "",
    education: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}users/get-user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();

        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          birth: data.birth?.split("T")[0] || "",
          email: data.email || "",
          phone: data.phone || "",
          residency: data.residency || "",
          education: data.education || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${VITE_API_URL}users/update-user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      alert("Salvestatud!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="documents-container pass-container">
      <h1>Profiili seaded</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="pass-header">
        <div className="doc">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <div style={{ display: "flex", gap: "1rem" }}>
                <div className="input-container">
                  <label>Eesnimi</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler}
                  />
                </div>

                <div className="input-container">
                  <label>Perekonnanimi</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className="input-container">
                <label>Sünniaeg</label>
                <input
                  type="date"
                  name="birth"
                  value={formData.birth}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <label>Telefon</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <label>Elukoht</label>
                <input
                  name="residency"
                  value={formData.residency}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <label>Haridus</label>
                <input
                  name="education"
                  value={formData.education}
                  onChange={changeHandler}
                />
                {/* <div className="add-education">
                  <p>Lisa haridus</p>
                  <FaPlusCircle size={25} />
                </div> */}
              </div>
            </div>

            <div className="buttons">
              <button type="submit">Salvesta</button>
              <button type="button" className="white">
                Kustuta konto
              </button>
            </div>
          </form>
        </div>

        <div className="prof-img">
          <img src="/assets/pictures/profileImage.png" alt="" />
          <FaPlusCircle size={50} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
