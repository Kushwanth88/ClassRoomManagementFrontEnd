import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function AllSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const { state } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 5;
  const role = state.user.role;
  const navigate = useNavigate();
  const navigateToGrades = () => {
    if (role === "student") {
      navigate("/api/studentgrade/"+state.user.id);
    } else if (role === "teacher") {
      navigate("/api/grades/"+state.user.id);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (state.isLoggedIn) {
      fetchData();
    }
  }, [state.isLoggedIn]);

  // Function to fetch submissions
  const fetchData = async () => {
    try {
      console.log("Fetching submissions for student ID:", state.user.id);
      const response = await axios.get(
        `http://localhost:8080/api/submission/student/${state.user.id}`
      );
      setSubmissions(response.data);
      console.log("Submissions fetched successfully:", response.data);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  // Pagination
  let indexOfLastSubmission = currentPage * submissionsPerPage;
  let indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  let currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);
  let totalPages = Math.ceil(submissions.length / submissionsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Function to handle submission status toggle
  const toggleSubmissionStatus = async (submissionId) => {
    try {
      await axios.put(`http://localhost:8080/api/submission/update/${submissionId}`).then((response) => {
        console.log("Submission status updated successfully:", response.data);
        fetchData(); // Re-fetch data after update
      });
    } catch (error) {
      console.error("Failed to toggle submission status:", error);
    }
  };

  // Function to render button text based on submission status
  const getButtonText = (isSubmitted) => {
    return isSubmitted ? "Unsubmit" : "Submit";
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">All Submissions</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Assignment ID</th>
              <th scope="col">Class ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Instructions</th>
              <th scope="col">Deadlines</th>
              <th scope="col">Submitted</th>
              <th scope="col">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.map((submission, index) => (
              <tr key={index}>
                <td>{submission.assignmentId}</td>
                <td>{submission.classId}</td>
                <td>{submission.title}</td>
                <td>{submission.description}</td>
                <td>{submission.instructions}</td>
                <td>{submission.deadlines}</td>
                <td>{submission.submitted ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleSubmissionStatus(submission.id)}
                  >
                    {getButtonText(submission.isSubmitted)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="text-left">
              <button
                onClick={previousPage}
                className="btn btn-primary"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                className="btn btn-primary ms-2"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <button
            className="btn btn-primary"
            onClick={navigateToGrades}
          >
            Go to {role === "student" ? "Student" : "Teacher"} Grades
          </button>
        </div>
      </div>
    </div>
  );
}
