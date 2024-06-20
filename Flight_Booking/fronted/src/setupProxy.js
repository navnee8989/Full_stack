const { createProxyMiddleware } = require('http-proxy-middleware');
const { toast } = require('react-toastify');


module.exports = function(app) {
  // Proxy for the flight API
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.FLIGHT_API || 'https://omairiq.azurewebsites.net',
      changeOrigin: true,
      secure: true, 
      logger: console,
      pathRewrite:{
        '^/api': ''
      },
     
    })
  );

  // Proxy for the payment API
  // app.use(
  //   '/payment',
  //   createProxyMiddleware({
  //     target: process.env.PAYMENT_API || 'https://payment.finanvo.in',
  //     changeOrigin: true,
  //     secure: true,
  //     logger: console,
  //     pathRewrite:{
  //       '^/payment': ''
  //     },

 
  //   })
  // );
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
