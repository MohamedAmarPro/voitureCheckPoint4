import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="containerNav">
        <div className="logo">
          <Link to="/">
            <img
              src="https://img.freepik.com/vecteurs-libre/modele-logo-detail-voiture_23-2149944706.jpg?size=626&ext=jpg&uid=R58535683&ga=GA1.2.2093840092.1686737814&semt=ais"
              alt=""
            />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=citadine">
            <h6>CITADINE</h6>
          </Link>
          <Link className="link" to="/?cat=berline">
            <h6>BERLINE</h6>
          </Link>
          <Link className="link" to="/?cat=suv">
            <h6>S.U.V</h6>
          </Link>
          <Link className="link" to="/?cat=collection">
            <h6>COLLECTION</h6>
          </Link>
          <Link className="link" to="/?cat=luxe">
            <h6>LUXE</h6>
          </Link>

          <span>{currentUser ? currentUser.username : null}</span>
          {currentUser ? (
            // Utilisez un bouton à la place du span pour la déconnexion
            <button
              type="button"
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
