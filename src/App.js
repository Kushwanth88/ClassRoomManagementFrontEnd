import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Grades from './pages/Grades';
import EditGrade from './pages/editgrade';
import Login from './pages/login';
import Register from './pages/Register';
import Navbar from './components/navbar';
import StudentGrades from './pages/studentgrade';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <h1>Hello</h1> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api/grades/:id" element={<Grades />} />
        <Route path="/api/editgrade/:id" element={<EditGrade />} />
        <Route path="/api/studentgrade/:id" element={<StudentGrades />} />
        <Route path="/api/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;