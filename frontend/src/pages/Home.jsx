import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8005/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err); // Utilisez console.error() pour afficher les erreurs dans la console
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts &&
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`http://localhost:8005/uploads/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <button type="button">Read More</button>{" "}
                {/* Ajoutez le type "button" */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
