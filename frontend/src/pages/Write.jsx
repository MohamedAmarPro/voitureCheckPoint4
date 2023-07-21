import axios from "axios";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../authContext";

function Write() {
  const { currentUser } = useContext(AuthContext);

  const { state } = useLocation();
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8005/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
      return null; // Ajouter cette ligne pour spécifier que la fonction retourne null en cas d'erreur
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      if (state) {
        await axios.put(`http://localhost:8005/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
        });
      } else {
        await axios.post(`http://localhost:8005/posts/${currentUser.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button type="button">Save as a draft</button>
            <button type="button" onClick={handleClick}>
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "citadine"}
              name="cat"
              value="citadine"
              id="citadine"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="citadine">citadine</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "berline"}
              name="cat"
              value="berline"
              id="berline"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="berline">berline</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "suv"}
              name="cat"
              value="suv"
              id="suv"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="suv">suv</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "collection"}
              name="cat"
              value="collection"
              id="collection"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="collection">collection</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "luxe"}
              name="cat"
              value="luxe"
              id="luxe"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="luxe">luxe</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
