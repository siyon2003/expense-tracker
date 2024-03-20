import React from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header>
      <div className="header-container">
        <Link to="/" className="HomePageLink">
          <h3 className="logo">
            <span>Real</span>
            <span>Estate</span>
          </h3>
        </Link>
        <form className="SearchComponent">
          <input
            type="text"
            placeholder="Search......"
            className="searchInput"
          />
          <FaSearch />
        </form>
        <ul>
          <Link to="/" className="HomePageLink">
            <li>Home</li>
          </Link>
          <Link to="/about" className="HomePageLink">
            <li>About</li>
          </Link>
          <Link to="/profile" className="HomePageLink">
            {currentUser ? <img src={currentUser.avatar} alt="profile" id="profileAvatar"/> : <li>Sign In</li>}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
