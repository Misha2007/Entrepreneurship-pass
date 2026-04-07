import { useState, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import "./Exp.css";
import { MdOutlineLink } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";

const { VITE_API_URL, VITE_APP_CloudName, VITE_APP_UnsignedUploadPreset } =
  import.meta.env;

const NewExp = (props) => {
  const [error, setError] = useState(null);

  const [data, setData] = useState({});

  const updateData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const errorHandler = () => {
    setError(null);
  };

  const saveUserDataHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData,
    };
    props.onLoginUser(userData);
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log("asdjajsdlkjsa");

    let fileUrl = data.fileUrl || "";

    if (data.file) {
      fileUrl = await handleAddImage(data.file);
      console.log("asdjajsdlkjsa");
    }
    console.log(fileUrl);
    const storedToken = localStorage.getItem("authToken");
    const response = await fetch(`${VITE_API_URL}exps/new-exp`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        fileUrl,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    });
    const expData = await response.json();
    console.log(expData);
    if (!response.ok) {
      const errorMessage = await response.text();
      setError({
        title: "Problems with backend",
        message: errorMessage || "Invalid data.",
      });
      return;
    }
  };

  const handleAddImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", VITE_APP_UnsignedUploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${VITE_APP_CloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (!data.secure_url) {
        throw new Error("Failed to upload file: " + file.name);
      }

      console.log(data);
      return data.secure_url;
    } catch (error) {
      console.error("Batch upload error:", error);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <div className="documents-container">
      <h1>Lisa uus kogemus</h1>
      <form className="exps" onSubmit={sumbitHandler}>
        <div className="doc">
          <label htmlFor="">Vali tüüp</label>
          <select id="" onChange={updateData} name="type">
            <option value="Vabatahtlik töö">Vabatahtlik töö</option>
            <option value="Erasmus+ praktika">Erasmus+ praktika</option>
            <option value="Koolitus">Koolitus</option>
            <option value="Üritus">Üritus</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Ettevõte / Üritus</label>
          <input type="text" onChange={updateData} name="title" />
        </div>
        <div>
          <label htmlFor="" placeholder="pp / kk / aaaa">
            Kuupäev
          </label>
          <input type="text" onChange={updateData} name="date" />
        </div>
        <div>
          <label htmlFor="">Maht</label>
          <input type="text" onChange={updateData} name="amount" />
        </div>
        <div>
          <label htmlFor="">Reflektsioon</label>
          <textarea
            type="text"
            placeholder="Mis sa tegid? Mis oli sinu jaoks õpetlik? Mis oli keeruline? Mida kasutad tulevikus?"
            onChange={updateData}
            name="reflection"
          />
        </div>
        <div className="addfile">
          <label htmlFor="">Lisa fail</label>
          <div className="input-file-container">
            <div>
              <MdOutlineLink color="#fff" size={25} />
            </div>

            <input
              type="link"
              placeholder="Lisa URL"
              onChange={updateData}
              name="fileUrl"
            />
          </div>
          <div className="input-file-container">
            <div>
              <RiAttachment2 color="#fff" size={25} />
            </div>
            <input
              type="file"
              onChange={(e) =>
                setData({
                  ...data,
                  file: e.target.files[0],
                })
              }
              name="file"
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Juhendaja e-post</label>
          <input type="text" onChange={updateData} name="mentor_email" />
        </div>
        <div className="buttons">
          <button type="submit">Saada juhendajale</button>
          <button className="white">Salvesta mustand</button>
        </div>
      </form>
    </div>
  );
};

export default NewExp;
