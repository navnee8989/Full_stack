const db = require("../config/db");

const getStudent = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM student_db.student_data;");

    if (rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Records Found in Database",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get All Student List",
      data: rows,
    });
  } catch (error) {
    console.error("Error in Get All Student List:", error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Student List",
      error: error.message,
    });
  }
};

//Get Student By ID
const getStudnetByID = async (req, res) => {
  try {
    const StudentID = req.params.id;
    if (!StudentID) {
      return res.status(404).send({
        success: false,
        message: " Student By ID Not Found",
      });
    }
    const data = await db.query(
      `SELECT * FROM student_db.student_data WHERE id=?`,
      [StudentID]
    );
    if (!data || data.length === 0) {
      res.status(404).send({
        success: false,
        message: "No record Found",
        error: error.message,
      });
    }
    res.status(200).send({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Error in Get All Student By ID:", error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Student By ID",
      error: error.message,
    });
  }
};

// Delete Student By ID

const deleteStudentByID = async (req, res) => {
  try {
    const StudentID = req.params.id;
    if (!StudentID) {
      return res.status(404).send({
        success: false,
        message: " Student By ID Not Found",
      });
    }
    const [data] = await db.query(`SELECT * FROM student_db.student_data WHERE id=?`,[StudentID])
    if(!data || data.length === 0){
      res.status(404).send({
        success: false,
        massege: "Data Not Found in Delete User",
        error: error.message
      })
    }
    res.status(200).send({
      success: true,
      massege: "Delete User ",
      data: data
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      massege: "This Error From Deleting User ",
      error: error.message
    })
  }
};

module.exports = { getStudent, getStudnetByID };
