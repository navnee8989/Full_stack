const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for the flight API
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.FLIGHT_API || "https://omairiq.azurewebsites.net",
      changeOrigin: true,
      secure: true,
      logger: console,
      pathRewrite: {
        "^/api": "",
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader(
          "api-key",
          "NTMzNDUwMDpBSVJJUSBURVNUIEFQSToxODkxOTMwMDM1OTk2OlFRYjhLVjNFMW9UV05RY1NWL0Vtcm9UYXFKTSs5dkZvaHo0RzM4WWhwTDhsamNqR3pPN1dJSHhVQ2pCSzNRcW0="
        );
        proxyReq.setHeader("Authorization", `${localStorage.getItem("token")}`);
        proxyReq.setHeader("Content-Type", "application/json");
      },
    })
  );

  // app.use(
  //   "/paymentdetails",
  //   createProxyMiddleware({
  //     target: "https://payment.finanvo.in",
  //     changeOrigin: true,
  //     logger: console,
  //     pathFilter: {
  //       "^/paymentdetails": "",
  //     },
  //   })
  // );
  // Uncomment the following if you need proxies for other APIs
  // Proxy for the payment API
  // app.use(
  //   "/payment",
  //   createProxyMiddleware({
  //     target: process.env.PAYMENT_API || "https://payment.finanvo.in",
  //     changeOrigin: true,
  //     secure: true,
  //     logger: console,
  //     pathRewrite: {
  //       "^/payment": "",
  //     },
  //   })
  // );

  // Proxy for the test payment API
  // app.use(
  //   '/testPayment',
  //   createProxyMiddleware({
  //     target: process.env.GET_PAYMENT_API || 'http://localhost:5000',
  //     changeOrigin: true,
  //     secure: true,
  //     logger: console,
  //     pathRewrite:{
  //       '^/testPayment': ''
  //     },
  //   })
  // );
};
