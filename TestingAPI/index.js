const express = require("express");
const cors = require("cors");
// const cookieParser = require('cookie-parser');
const bookingRoutes = require("./routes/index");
const morgan = require("morgan");
const app = express();

app.use(express.json());
// app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/book", bookingRoutes);

const PORT = process.env.PORT || 2589;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
