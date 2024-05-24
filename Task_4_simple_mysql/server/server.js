const express = require("express");
const cors = require('cors')
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mysqlPool = require("./config/db");
const app = express();




// Configure dotenv
dotenv.config();

// Middleware
app.use(morgan("dev"));
app.use(cors())

// Routes
app.use("/api/v1/student", require("./routes/student_routes"));

const PORT = process.env.PORT || 8080;

// Conditionally listen
mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("Database Connected".bgYellow.bgGreen);
    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`.bgMagenta.white);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });
