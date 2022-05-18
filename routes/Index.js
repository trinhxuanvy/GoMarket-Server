const categoryRouter = require("./Category");
const userRouter = require("./User");
const uploadFileRoute = require("./UploadFile");

function route(app) {
  app.use(categoryRouter);
  app.use(userRouter);
  app.use(uploadFileRoute);
}

module.exports = route;
