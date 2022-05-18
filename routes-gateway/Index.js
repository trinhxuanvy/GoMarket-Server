const express = require("express");
const axios = require("axios").default;
const router = express.Router();

router.get("/api/v1/:apiName", (req, res) => {
  axios
    .get(`http://localhost:8000/api/v1/${req.params.apiName}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => {
      res.send({ message: "Error" });
    });
});

router.post("/api/v1/:apiName", (req, res) => {
  switch (req.params.apiName) {
    case "UploadFile":
      axios
        .post(`http://localhost:8000/api/v1/${req.params.apiName}`, req.body)
        .then((response) => {
          res.send(response.data);
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;

    default:
      axios
        .post(`http://localhost:8000/api/v1/${req.params.apiName}`, req.body)
        .then((response) => {
          res.send(response.data);
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;
  }
});

module.exports = router;
