import './App.css';
import React, { useState } from "react";
import StudentInfo from "./StudentInfo"; 
import logo from './logo.svg';

function App() {
  const [student] = useState({
    name: "Krishna Venu",
    studentId: "101484996",
    course: "COMP 3123 – Full Stack Development I",
    lab: "Week 9 – ReactJS State and Props"
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>React JS Lab Week 9</h1>
      <h2>{student.course}</h2>

      {/* Using the StudentInfo component with props */}
      <StudentInfo
        name={student.name}
        id={student.studentId}
        course={student.course}
        lab={student.lab}
      />
    </div>
  );
}

export default App;
