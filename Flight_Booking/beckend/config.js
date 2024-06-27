require("dotenv").config();

module.exports = {
  apiKey: process.env.API_KEY,
  authToken: process.env.AUTH_TOKEN,
  cookie: process.env.COOKIE,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};
