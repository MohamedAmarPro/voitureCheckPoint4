import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Edit from "../assets/edit copie.png";
import Delete from "../assets/delete copie.png";
import Menu from "../components/Menu";
import { AuthContext } from "../authContext";

function Single() {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8005/posts/${postId}`);
        setPost(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8005/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img
          src={post.img ? `http://localhost:8005/uploads/${post.img}` : ""}
          alt=""
        />

        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.title}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                {/* Appliquer la classe CSS "edit-button" pour le bouton "Edit" */}
                <button type="button" className="edit-button">
                  <img src={Edit} alt="" />
                </button>
              </Link>
              {/* Appliquer la classe CSS "delete-button" pour le bouton "Delete" */}
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
              >
                <img src={Delete} alt="" />
              </button>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}

export default Single;
