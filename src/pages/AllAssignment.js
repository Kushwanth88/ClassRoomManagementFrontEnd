import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

export default function AllAssignments() {
  const [assignments, setAssignments] = useState([]);
  const { state } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 5;

  // Fetch data when component mounts
  useEffect(() => {
    if (state.isLoggedIn) {
      fetchData();
    }
  }, [state.isLoggedIn]);

  // Function to fetch assignments
  const fetchData = async () => {
    try {
      console.log("Fetching assignments for teacher ID:", state.user.id);
      const response = await axios.get(
        `http://localhost:8080/api/assignment/${state.user.id}`
      );
      setAssignments(response.data);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  // Pagination
  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);
  const totalPages = Math.ceil(assignments.length / assignmentsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/assignment/delete/${id}`);
      fetchData(); // Refresh assignments after deletion
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  const handleUpdate = async (id, updatedAssignmentData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/assignment/update/${id}`, updatedAssignmentData);
      console.log("Updated assignment:", response.data);
      // Optionally, you can handle success behavior such as showing a success message or redirecting the user
    } catch (error) {
      console.error("Failed to update assignment:", error);
      // Optionally, you can handle error behavior such as showing an error message
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="text-center mb-4">All Assignments</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Class ID</th>
              <th scope="col">Instructions</th>
              <th scope="col">Deadlines</th>
              <th scope="col">Max Score</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAssignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.classId}</td>
                <td>{assignment.instructions}</td>
                <td>{assignment.deadlines}</td>
                <td>{assignment.maxScore}</td>
                <td>
                <Link
                    to={"/api/editassignment/"+assignment.id}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="btn btn-danger"
                  >
                    Delete
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
      <Link to={"/api/assignment/"+state.user.id} className="btn btn-primary">
              Create new Assignment
            </Link>
    </div>
  );
}
