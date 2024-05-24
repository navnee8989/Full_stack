const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");

const app = express();
require('dotenv').config()

//MiddleWare
//Cross browser
app.use(cors());
//add Morgan to View API response in Log
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`Server Connected To ${PORT}`.bgCyan);
});
