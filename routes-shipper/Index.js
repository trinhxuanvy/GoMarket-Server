const shipperRouter = require('./Shipper');

function route(app) {
  app.use(shipperRouter);
}

module.exports = route;
