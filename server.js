const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const route = require("./routes");
const sms = require("./services/sms");

dotenv.config();

const server = express();

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
route(server);

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECT_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Can't connect to database");
  });

server.listen(port, () => {
  console.log("Listening at port " + port);
});
