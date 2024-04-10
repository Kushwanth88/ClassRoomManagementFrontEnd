import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Assignment() {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    classId: "",
    instructions: "",
    deadlines: "",
    maxScore: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({ ...assignmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Assignment data:", assignmentData);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/assignment/create/${state.user.id}`,
        assignmentData
      );
      console.log("Assignment created successfully:", response.data);
      navigate(`/api/Allassignment/${state.user.id}`);
    } catch (error) {
      console.error("Failed to create assignment:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Create New Assignment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter assignment title"
                name="title"
                value={assignmentData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter assignment description"
                name="description"
                value={assignmentData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="classid" className="form-label">
                Class ID
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter class ID"
                name="classId"
                value={assignmentData.classId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">
                Instructions
              </label>
              <textarea
                className="form-control"
                placeholder="Enter assignment instructions"
                name="instructions"
                value={assignmentData.instructions}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deadlines" className="form-label">
                Deadlines
              </label>
              <input
                type="date"
                className="form-control"
                name="deadlines"
                value={assignmentData.deadlines}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="maxScore" className="form-label">
                Max Score
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter maximum score"
                name="maxScore"
                value={assignmentData.maxScore}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Create Assignment
              </button>
              <Link to={"/api/Allassignment/"+state.user.id} className="btn btn-outline-primary">
                 View All Assignments
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
