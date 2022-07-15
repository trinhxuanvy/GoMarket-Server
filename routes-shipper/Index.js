const shipperRouter = require('./Shipper');
const authRouter = require('./Auth');

function route(app) {
  app.use(shipperRouter);
  app.use(authRouter);
}

module.exports = route;
