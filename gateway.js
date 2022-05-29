const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const gatewayRouter = require("./routes-gateway");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(gatewayRouter);
app.use(cors({
  origin: "*"
}))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Gateway has started on port " + port);
});
