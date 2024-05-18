import React, { useState, useEffect } from "react";

const StudentList = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/student/studentlist", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (!res || res.length === 0) {
          console.log("Data not found");
        } else {
          setData(res);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Fees</th>
            <th>Role No</th>
            <th>Class</th>
            <th>Medium</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No data available</td>
            </tr>
          ) : (
            data.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.fees}</td>
                <td>{student.role_no}</td>
                <td>{student.class}</td>
                <td>{student.medium}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
