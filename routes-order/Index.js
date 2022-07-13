const orderRouter = require('./Order');

function route(app) {
  app.use(orderRouter);
}

module.exports = route;
