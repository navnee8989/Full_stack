import React, { useState, useEffect } from "react";
import './Style.css'
const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = () => {
    fetch("http://localhost:8080/api/v1/student/studentlist")
     .then((response) => response.json())
     .then((res) => {
        if (!res ||!res.success) {
          console.log("Data not found");
          setError("Response data not found");
        } else {
          console.log(res);
          setStudentData(res.data);
        }
      })
     .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Server Error. Please check the server.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  console.log(studentData.medium);
  return (
    <div>
      <h1 className="text-center bg-slate-400 text-white">{error}</h1>
      <table className="table-auto w-full border app-contianer" >
        <thead className="bg-slate-600">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Fees</th>
            <th>Role No</th>
            <th>Class</th>
            <th>Medium</th>
          </tr>
        </thead>
        <tbody className="bg-green-300 text-center">
          {studentData.length === 0? (
            <tr>
              <td colSpan="6" className="text-center">No data available</td>
            </tr>
          ) : (
            studentData.map((student) => (
              <tr key={student.id}>
                <td >{student.id}</td>
                <td >{student.name}</td>
                <td>{student.fees}</td>
                <td>{student.role_no}</td>
                <td>{student.class}</td>
                <td>{student.meduim}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;