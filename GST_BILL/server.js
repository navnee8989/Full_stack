const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const gstRoutes = require("./routes/index");
const { fetchData } = require("./helpers");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/gst", gstRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(PORT, async () => {
    try {
      const gstnumber = "07AAPCA6346P1ZX"
      await fetchData(gstnumber)
    } catch (err) {
      console.error(err);
    }
    console.log(`Server running on port ${PORT}`);
  });
});
