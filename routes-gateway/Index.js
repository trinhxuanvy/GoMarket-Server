const express = require("express");
const { withQuery } = require("ufo");
const axios = require("axios").default;
const router = express.Router();

router.get("/api/v1/:apiName", (req, res) => {
  const queryUrl = withQuery(
    `http://localhost:8000/api/v1/${req.params.apiName}`,
    req.query
  );
  axios
    .get(queryUrl, { headers: req.headers })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(() => {
      res.send({ message: "Error" });
    });
});

router.post("/api/v1/:apiName", async (req, res) => {
  switch (req.params.apiName.toLowerCase()) {
    case "uploadfile":
      axios
        .post(`http://localhost:8000/api/v1/${req.params.apiName}`, req.body)
        .then((response) => {
          res.send({ imageUrl: response.data });
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;
    case "auth":
      console.log(req.body);
      axios
        .post(`http://localhost:8000/api/v1/${req.params.apiName}`, req.body)
        .then((response) => {
          console.log(response.data);
          res.send({ data: response.data });
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;
    default:
      let url = `http://localhost:8000/api/v1/${req.params.apiName}`;
      if (req.body._id) {
        url += `/${req.body._id}`;
      }
      console.log(req.body);
      axios
        .post(url, req.body)
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
    .patch(`http://localhost:8000/api/v1/store/verify`, req.body, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send({ message: "Error" });
    });
});

router.post("/api/v1/store/block", (req, res) => {
  console.log(req.body);
  axios
    .patch(
      `http://localhost:8000/api/v1/store/block/${req.body.id}`,
      {},
      { headers: req.headers }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send({ message: "Error" });
    });
});

router.put("/api/v1/:apiName", (req, res) => {
  let url = `http://localhost:8000/api/v1/${req.params.apiName}`;
  if (req.body._id) {
    url += `/${req.body._id}`;
  }

  axios
    .patch(url, req.body)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(() => {
      console.log("lỗi");
      res.send({ message: "Error" });
    });
});

router.get("/api/v1/:apiName/:id", (req, res) => {
  const queryUrl = `http://localhost:8000/api/v1/${req.params.apiName}/${req.params.id}`;
  axios
    .get(queryUrl)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(() => {
      console.log("lỗi");
      res.send({ message: "Error" });
    });
});

router.post("/api/v1/Auth/:type", async (req, res) => {
  switch (req.params.type.toLowerCase()) {
    case "register":
      axios
        .post(`http://localhost:8000/api/v1/Auth/register`, req.body)
        .then((response) => {
          res.send(response.data);
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;
    default:
      axios
        .post(`http://localhost:8000/api/v1/Auth/login`, req.body)
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
module.exports = router;
