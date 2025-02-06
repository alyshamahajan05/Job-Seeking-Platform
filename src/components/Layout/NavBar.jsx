import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const [show, setshow] = useState(false);
  const { isAuthorised, setIsAuthorised, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorised(false);
      navigateTo("/login");
    } catch (err) {
      toast.error(err.response.data.message);
      setIsAuthorised(true);
      console.log(err);
    }
  };

  return (
    <nav className={`navbar ${isAuthorised ? "navbarShow" : "navbarHide"}`}>
      <div className="container">
        <img src="/JobZee-logos__white.png" alt="logo" />
        <ul className={`menu ${show ? "show-menu" : ""}`}>
          <li>
            <Link to="/" onClick={() => setshow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setshow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to="/application/me" onClick={() => setshow(false)}>
              {user && user.role === "Employer"
                ? "Applicant's Applications"
                : "My Applications"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to="/job/post" onClick={() => setshow(false)}>
                  Post NEW Job
                </Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setshow(false)}>
                  View Your Jobs
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setshow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
