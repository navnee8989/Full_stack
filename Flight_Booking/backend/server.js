const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const { config } = require("dotenv");
const db = require('./models');
const Search_Flight = require('./routes/index');

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define a simple route to test the setup
app.get("/", (req, res) => {
  res.send("Welcome to the Flight Search API");
});

app.use('/api/FlightBook', Search_Flight);

const PORT = process.env.PORT || 2589;

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running On ${PORT}`.green);
    });
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
