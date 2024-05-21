const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mern-location-app-api.onrender.com',
      changeOrigin: true,
    })
  );
};
