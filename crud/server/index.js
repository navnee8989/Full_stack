const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 5000;
const db = require('./models');
const { sequelize } = db;
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 


const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
