const express = require("express");
const { withQuery } = require("ufo");
const axios = require("axios").default;
const router = express.Router();

router.get("/api/v1/:apiName", (req, res) => {
  const queryUrl = withQuery(`http://localhost:8000/api/v1/${req.params.apiName}`, req.query);
  axios
    .get(queryUrl)
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
          console.log(response.data);
          res.send(response.data);
        })
        .catch(() => {
          console.log("lỗi");
          res.send({ message: "Error" });
        });
      break;
  }
});

router.post("/api/v1/store/verify", (req, res) => {
  axios
    .patch(`http://localhost:8000/api/v1/store/verify`, req.body)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send({ message: "Error" });
    });
});

module.exports = router;
