import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

export default function EditAssignment() {
  const { state } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classId, setClassId] = useState('');
  const [instructions, setInstructions] = useState('');
  const [deadlines, setDeadlines] = useState('');
  const [maxScore, setMaxScore] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:8080/api/assignment/update/${id}`, {
        title: title,
        description: description,
        classid: classId,
        instructions: instructions,
        deadlines: deadlines,
        maxScore: maxScore
      });
  
      console.log("Assignment updated successfully:", response.data);
  
      navigate(`/api/Allassignment/${state.user.id}`);
    } catch (error) {
      console.error("Failed to update assignment:", error);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Assignment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">
                Instructions
              </label>
              <textarea
                className="form-control"
                id="instructions"
                rows="3"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="deadlines" className="form-label">
                Deadlines
              </label>
              <input
                type="date" // Change type to "date"
                className="form-control"
                id="deadlines"
                value={deadlines}
                onChange={(e) => setDeadlines(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="maxScore" className="form-label">
                Max Score
              </label>
              <input
                type="number"
                className="form-control"
                id="maxScore"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary me-2">
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate(`/api/Allassignment/${state.user.id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
