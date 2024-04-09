import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import Performance from "../charts/performance";
import PerformanceBar from "../charts/performanceBar";

export default function StudentGrades() {
  const [grades, setGrades] = useState([]);
  const { state } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const gradesPerPage = 5;

  // Function to fetch grades
  const fetchData = async () => {
    try {
      console.log("Fetching grades for student ID:", state.user.id);
      const response = await axios.get(
        `http://localhost:8080/api/studentgrade/${state.user.id}`
      );
      setGrades(response.data);
    } catch (error) {
      console.error("Failed to fetch grades:", error);
    }
  };

  // Fetch data when component mounts or when user ID changes
  useEffect(() => {
    if (state.isLoggedIn) {
      fetchData();
    }
  }, [state.isLoggedIn, state.user.id]);

  // Pagination
  const indexOfLastGrade = currentPage * gradesPerPage;
  const indexOfFirstGrade = indexOfLastGrade - gradesPerPage;
  const currentGrades = grades.slice(indexOfFirstGrade, indexOfLastGrade);
  const totalPages = Math.ceil(grades.length / gradesPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">Grades</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Teacher ID</th>
              <th scope="col">Class ID</th>
              <th scope="col">Assignment ID</th>
              <th scope="col">Score</th>
              <th scope="col">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {currentGrades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.teacherId}</td>
                <td>{grade.classId}</td>
                <td>{grade.assignmentId}</td>
                <td>{grade.score}</td>
                <td>{grade.feedback}</td>
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
        <div className="my-4">
          <PerformanceBar
            assignmentIds={grades.map((grade) => grade.assignmentId)}
            scores={grades.map((grade) => grade.score)}
          />
        </div>
      </div>
    </div>
  );
}
