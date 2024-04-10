import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import Performance from "../charts/performance";

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const { state } = useContext(GlobalContext);
  const [below35Count, setBelow35Count] = useState(0);
  const [range35to50Count, setRange35to50Count] = useState(0);
  const [range50to80Count, setRange50to80Count] = useState(0);
  const [above80Count, setAbove80Count] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const gradesPerPage = 5;

  // Fetch data when component mounts
  useEffect(() => {
    if (state.isLoggedIn) {
      fetchData();
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    let below35 = 0;
    let range35to50 = 0;
    let range50to80 = 0;
    let above80 = 0;

    grades.forEach((grade) => {
      const score = grade.score;
      if (score < 35) {
        below35++;
      } else if (score >= 35 && score <= 50) {
        range35to50++;
      } else if (score > 50 && score <= 80) {
        range50to80++;
      } else if (score > 80) {
        above80++;
      }
    });

    setBelow35Count(below35);
    setRange35to50Count(range35to50);
    setRange50to80Count(range50to80);
    setAbove80Count(above80);
  }, [grades]);

  // Function to fetch grades
  const fetchData = async () => {
    try {
      console.log("Fetching grades for student ID:", state.user.id);
      const response = await axios.get(
        "http://localhost:8080/api/grades/" + state.user.id
      );
      setGrades(response.data);
    } catch (error) {
      console.error("Failed to fetch grades:", error);
    }
  };

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
        <div className="row">
          <div className="col-md-6">
            <Link to={"/api/Allassignment/"+state.user.id} className="btn btn-primary me-2">
               View All Assignments
            </Link>
          </div>
        </div>
        <h2 className="text-center mb-4">Grades</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th scope="col">Student ID</th>
              <th scope="col">Class ID</th>
              <th scope="col">Assignment ID</th>
              <th scope="col">Score</th>
              <th scope="col">Feedback</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGrades.map((grade, index) => (
              <tr key={index}>
                {/* <td>{grade.id}</td> */}
                <td>{grade.studentId}</td>
                <td>{grade.classId}</td>
                <td>{grade.assignmentId}</td>
                <td>{grade.score}</td>
                <td>{grade.feedback}</td>
                <td>
                  <Link
                    to={`/api/editgrade/${grade.id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
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
        <div className="my-4">
          <Performance scores={grades.map((grade) => grade.score)} />
        </div>  
      </div>
    </div>
  );
}
