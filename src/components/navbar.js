import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Navbar() {
  const { state, dispatch } = useContext(GlobalContext);
  console.log("Context: ", state)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <h1 className="navbar-brand">Class</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {state.isLoggedIn ? (
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
             <Link to="/api/profile">
             <h1 className="navbar-brand">Hello, {state.user.name}</h1>
              </Link> 
            </div>
          ) : (
            <div className="d-flex">
            </div>
          )}
          {state.isLoggedIn && (
            <Link
              className="btn btn-outline-light"
              to="/"
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
