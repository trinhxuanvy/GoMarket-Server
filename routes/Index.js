const categoryRouter = require('./Category');
const userRouter = require('./User');
const storeRouter = require('./Store');
const orderRouter = require('./Order');
const uploadFileRoute = require('./UploadFile');
const authRouter = require('./Auth');
const productRouter = require('./Product');
const shipperRouter = require('./Shipper');

function route(app) {
  app.use(categoryRouter);
  app.use(userRouter);
  app.use(storeRouter);
  app.use(productRouter);
  app.use(orderRouter);
  app.use(uploadFileRoute);
  app.use(authRouter);
  app.use(shipperRouter);
}

module.exports = route;
