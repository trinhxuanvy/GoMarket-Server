const express = require("express");
const dotenv = require("dotenv");
const gatewayRouter = require("./routes-gateway");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(gatewayRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Gateway has started on port " + port);
});
