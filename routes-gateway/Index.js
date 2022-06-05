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
      console.log("oke");
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
      axios
        .post(`http://localhost:8000/api/v1/${req.params.apiName}`, req.body)
        .then((response) => {
          res.send({ data: response.data });
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;
    default:
      let url = `http://localhost:8000/api/v1/${req.params.apiName}`;
      if (req.body?._id) {
        url += `/${req.body._id}`;
      }
      console.log(url);
      axios
        .post(url, req.body, {
          headers: {
            "content-type": "application/json",
            authorization: req.headers?.authorization,
          },
        })
        .then((response) => {
          res.send(response.data);
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "Error" });
        });
      break;
  }
});

router.post("/api/v1/store/verify", (req, res) => {
  axios
    .post(`http://localhost:8000/api/v1/store/verify`, req.body, {
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
  axios
    .post(`http://localhost:8000/api/v1/store/block/${req.body.id}`, req.body, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send({ message: "Error" });
    });
});

router.put("/api/v1/:apiName", (req, res) => {
  let url = `http://localhost:8000/api/v1/${req.params.apiName}/update`;
  axios
    .post(url, req.body, { headers: req.headers })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(() => {
      console.log("lỗi");
      res.send({ message: "Error" });
    });
});

router.get("/api/v1/:apiName/byId", (req, res) => {
  const queryUrl = `http://localhost:8000/api/v1/${req.params.apiName}`;
  axios
    .get(queryUrl, { headers: req.headers })
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
          res.send(response.data);
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;
  }
});

router.post("/api/v1/Auth/user/:type", async (req, res) => {
  switch (req.params.type.toLowerCase()) {
    case "register":
      axios
        .post(`http://localhost:8000/api/v1/Auth/user/register`, req.body)
        .then((response) => {
          console.log(response.data);
          res.send(response.data);
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "Error" });
        });
      break;
    default:
      axios
        .post(`http://localhost:8000/api/v1/Auth/user/login`, req.body)
        .then((response) => {
          res.send(response.data);
        })
        .catch(() => {
          res.send({ message: "Error" });
        });
      break;
  }
});

router.post("/api/v1/store/profile", (req, res) => {
  console.log("đageq");
  axios
    .post(`http://localhost:8000/api/v1/store/profile`, req.body, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send({ message: "Error" });
    });
});

router.get("/api/v1/store/profile", (req, res) => {
  const query = withQuery(
    `http://localhost:8000/api/v1/store/profile`,
    req.query
  );
  axios
    .get(query, {
      headers: req.headers,
    })
    .then((response) => {
      res.send({
        status: 200,
        data: {
          store: response.data?.data,
        },
      });
    })
    .catch((error) => {
      res.send({ status: 404, message: "Error" });
    });
});

router.get("/api/v1/page/manage-store/all-store", async (req, res) => {
  try {
    const allStore = await axios.get(
      `http://localhost:8000/api/v1/store/byOwnerId`,
      { headers: req.headers }
    );

    if (allStore.data.status !== 200) {
      return res.send({
        status: 404,
        message: "Error",
      });
    }
    console.log(allStore.data.data);
    res.send({
      status: 200,
      data: {
        stores: allStore.data?.data,
      },
    });
  } catch (error) {
    res.send({
      status: 404,
      message: "Error",
    });
  }
});

router.post("/api/v1/store/profile/update", (req, res) => {
  const body = {
    ...req.body?.data,
    id: req.body?.id,
  };
  axios
    .post(`http://localhost:8000/api/v1/store/profile/update`, body, {
      headers: {
        "content-type": "application/json",
        authorization: req.headers?.authorization,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send({ message: "Error" });
    });
});

router.get("/api/v1/user/logout", async (req, res) => {
  console.log("heada");
  axios
    .get(`http://localhost:8000/api/v1/Auth/user/logout`, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send({ message: "Error" });
    });
});

router.get("/api/v1/admin/logout", async (req, res) => {
  axios
    .get(`http://localhost:8000/api/v1/Auth/logout`, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send({ message: "Error" });
    });
});

module.exports = router;
