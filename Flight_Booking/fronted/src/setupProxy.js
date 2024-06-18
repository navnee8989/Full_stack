const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config();

console.log("Payment", process.env.PAYMENT_API);

module.exports = function (app) {
 
  

  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.FLIGHT_API,
      changeOrigin: true,
      secure: false,
    })
  );
};
