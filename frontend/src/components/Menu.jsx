import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8005/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          {post.img ? (
            <img src={`http://localhost:8005/uploads/${post.img}`} alt="" />
          ) : null}
          <h2>{post.title}</h2>
          <button type="button">Read More</button>
        </div>
      ))}
    </div>
  );
}

// Validation des props
Menu.propTypes = {
  cat: PropTypes.string.isRequired,
};

export default Menu;
