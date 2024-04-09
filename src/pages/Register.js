import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Register() {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  const role = state.user.role; // Retrieving role from global context

const navigateToGrade = () => {
    if (role === "student") {
        navigate("/api/studentgrade/" + state.user.id);
    } else if (role === "teacher") {
        navigate("/api/grades/" + state.user.id);
    }
};

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={state.user.name}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={state.user.email}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={state.user.password}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactInfo" className="form-label">
                Contact Info
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your contact information"
                name="contactInfo"
                value={state.user.contactInfo}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="socialMediaLinks" className="form-label">
                Social Media Links
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your social media links"
                name="socialMediaLinks"
                value={state.user.socialMediaLinks}
                readOnly
              />
            </div>
          </form>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-danger"
              onClick={navigateToGrade}
            >
              Go to {role === "student" ? "Student" : "Teacher"} Grades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
