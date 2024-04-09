import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios
import { GlobalContext } from "../context/GlobalContext";


export default function Editgrade() {
  const { state } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:8080/api/editgrade/${id}`, {
        score: score,
        feedback: feedback
      });
  
      // Handle successful update
      console.log("Grade updated successfully:", response.data);
  
      // Navigate to the grades page
      navigate(`/api/grades/${state.user.id}`);
    } catch (error) {
      console.error("Failed to update grade:", error);
      // Handle error
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Grade</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="score" className="form-label">
                Score
              </label>
              <input
                type="number"
                className="form-control"
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="feedback" className="form-label">
                Feedback
              </label>
              <textarea
                className="form-control"
                id="feedback"
                rows="3"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary me-2">
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate('/api/grades/$(state.user.id)')}
              >
                Cancel
              </button>
            </div>
          </form>
            <Link className="btn btn-outline-danger mx-2" to="/api/grades/$(state.user.id)"/>
        </div>
      </div>
    </div>
  );
}
