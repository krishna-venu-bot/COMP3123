import React from "react";

function StudentInfo(props) {
  return (
    <div style={{
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      padding: "20px",
      marginTop: "20px",
      display: "inline-block",
      textAlign: "left",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h3>Student Information</h3>
      <p><strong>Name:</strong> {props.name}</p>
      <p><strong>Student ID:</strong> {props.id}</p>
      <p><strong>Course:</strong> {props.course}</p>
      <p><strong>Lab:</strong> {props.lab}</p>
    </div>
  );
}

export default StudentInfo;
