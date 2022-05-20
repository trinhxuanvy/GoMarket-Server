const categoryRouter = require('./Category');
const userRouter = require('./User');
const storeRouter = require('./Store');
const orderRouter = require('./Order');
const uploadFileRoute = require('./UploadFile');

function route(app) {
  app.use(categoryRouter);
  app.use(userRouter);
  app.use(storeRouter);
  app.use(orderRouter);
  app.use(uploadFileRoute);
}

module.exports = route;
