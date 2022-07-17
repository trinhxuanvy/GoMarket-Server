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
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(() => {
      res.send({ message: "Error" });
    });
});

router.post("/api/v1/:apiName", async (req, res) => {
  console.log("đwqjdbhfcd");
  switch (req.params.apiName.toLowerCase()) {
    case "uploadfile":
      // console.log("oke");
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
    case "createorder":
      console.log(req.body);
      axios
        .post(
          `http://localhost:8000/api/v1/${req.params.apiName}`,
          { ...req.body["0"], id: req.body["id"] },
          {
            headers: {
              "content-type": "application/json",
              authorization: req.headers?.authorization,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          res.send(response.data);
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

router.get("/api/v1/user/orders", async (req, res, next) => {
  axios
    .get(`http://localhost:8000/api/v1/user/orders`, {
      headers: {
        "content-type": "application/json",
        authorization: req.headers?.authorization,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ status: 404, message: "Error" });
    });
});

router.get("/api/v1/user/order/orderdetails/:id", async (req, res, next) => {
  axios
    .get(
      `http://localhost:8000/api/v1/user/order/orderdetails/${req.params.id}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: req.headers?.authorization,
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ status: 404, message: "Error" });
    });
});

router.post("/api/v1/user/addcart", (req, res) => {
  axios
    .post(`http://localhost:8000/api/v1/user/addcart`, req.body, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send({ message: "Error" });
    });
});

router.put("/api/v1/user/order/rating", (req, res) => {
  axios
    .put(`http://localhost:8000/api/v1/user/order/rating`, req.body, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send({ message: "Error" });
    });
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
      // console.log(response.data);
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
      // console.log(response.data);
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
          // console.log(response.data);
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

router.post("/api/v1/Auth/Shipper/:type", async (req, res) => {
  switch (req.params.type.toLowerCase()) {
    case "register":
      axios
        .post(`http://localhost:8001/api/v1/Auth/Shipper/register`, req.body)
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
        .post(`http://localhost:8001/api/v1/Auth/Shipper/login`, req.body)
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
      res.status(200).send({
        status: 200,
        data: {
          store: response.data?.data,
        },
      });
    })
    .catch((error) => {
      res.status(404).send({ status: 404, message: "Error" });
    });
});

// router.get("/api/v1/product", (req, res) => {
//   console.log(req.query);
//   const query = withQuery(
//     `http://localhost:8000/api/v1/product`,
//     req.query
//   );
//   axios
//     .get(query, {
//       headers: req.headers,
//     })
//     .then((response) => {
//       res.send({
//         status: 200,
//         data: {
//           store: response.data?.data,
//         },
//       });
//     })
//     .catch((error) => {
//       res.send({ status: 404, message: "Error" });
//     });
// });

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

router.get("/api/v1/user/byId", async (req, res, next) => {
  axios
    .get(`http://localhost:8000/api/v1/user/byId`, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ status: 404, message: "Error" });
    });
});

router.post("/api/v1/user/byId/update", async (req, res, next) => {
  delete req.body[0]._token;
  console.log(req.body[0]);
  axios
    .post(`http://localhost:8000/api/v1/user/byId/update`, req.body[0], {
      headers: {
        "content-type": "application/json",
        authorization: req.headers?.authorization,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      throw error;
      res.send({ message: "Error" });
    });
});

router.get("/api/v1/Shipper/byId", async (req, res, next) => {
  axios
    .get(`http://localhost:8001/api/v1/Shipper/byId`, {
      headers: req.headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ status: 404, message: "Error" });
    });
});

router.post("/api/v1/user/Shipper/update", async (req, res, next) => {
  delete req.body[0]._token;
  console.log(req.body[0]);
  axios
    .post(`http://localhost:8001/api/v1/user/Shipper/update`, req.body[0], {
      headers: {
        "content-type": "application/json",
        authorization: req.headers?.authorization,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      throw error;
      res.send({ message: "Error" });
    });
});

router.get("/api/v1/shipper/order", async (req, res, next) => {
  try {
    const shipper = await axios.get(
      `http://localhost:8001/api/v1/shipper/byId`,
      {
        headers: {
          "content-type": "application/json",
          authorization: req.headers?.authorization,
        },
      }
    );
    if (shipper?.data?.data?.user?.storeId == null) {
      return res.send({
        status: 404,
        message: "Error",
      });
    }

    const allOrder = await axios.get(
      withQuery(
        `http://localhost:8000/api/v1/order/store/${shipper?.data?.data?.user?.storeId}/shipping/${shipper?.data?.data?.user?._id}`,
        req.query
      ),
      {
        headers: {
          "content-type": "application/json",
          authorization: req.headers?.authorization,
        },
      }
    );

    // const pageSize = 5;
    // const startItem = (req.query.page - 1) * pageSize;
    // const endItem = req.query.page * pageSize;
    // const total = allOrder.length;
    // const entities = allOrder.slice(startItem, endItem);
    res.send({
      status: 200,
      data: {
        orders: { entities: allOrder.data, total: allOrder.data.length },
      },
    });
  } catch (error) {
    res.send({
      status: 404,
      message: "Error",
    });
  }
});
router.put("/api/v1/shipper/order/:_id/status", async (req, res, next) => {
  try {
    const shipperInfo = await axios.get(
      `http://localhost:8001/api/v1/shipper/byId`,
      {
        headers: {
          "content-type": "application/json",
          authorization: req.headers?.authorization,
        },
      }
    );
    const shipper = await axios.patch(
      `http://localhost:8000/api/v1/order/${req.params._id}/status`,
      { shipperId: shipperInfo.data.data.user._id },
      {
        headers: {
          "content-type": "application/json",
          authorization: req.headers?.authorization,
        },
      }
    );
    res.send({
      status: 200,
      data: {
        entity: shipper.data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 404,
      message: "Error",
    });
  }
});
router.put("/api/v1/shipper/order/:_id/cancel", async (req, res, next) => {
  try {
    const shipper = await axios.patch(
      `http://localhost:8000/api/v1/order/${req.params._id}/cancel`
    );
    res.send({
      status: 200,
      data: {
        message: "OK",
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 404,
      message: "Error",
    });
  }
});

router.get("/api/v1/page/manage-orders/:id", async (req, res) => {
  try {
    const allOrders = await axios.get(
      `http://localhost:8000/api/v1/Order/Store/${req.params.id}`,
      { headers: req.headers }
    );

    if (allOrders.data.status !== 200) {
      return res.send({
        status: 404,
        message: "Error",
      });
    }

    res.send({
      status: 200,
      data: {
        orders: allOrders.data?.data,
      },
    });
  } catch (error) {
    res.send({
      status: 404,
      message: "Error",
    });
  }
});

router.get("/api/v1/page/manage-orders/detail/:id", async (req, res) => {
  try {
    const allOrderDetail = await axios.get(
      `http://localhost:8000/api/v1/Order/Store/Detail/${req.params.id}`,
      { headers: req.headers }
    );

    if (allOrderDetail.data.status !== 200) {
      return res.send({
        status: 404,
        message: "Error",
      });
    }

    console.log({
      status: 200,
      data: {
        orderDetails: allOrderDetail.data?.data,
      },
    });

    res.send({
      status: 200,
      data: {
        orderDetails: allOrderDetail.data?.data,
      },
    });
  } catch (error) {
    res.send({
      status: 404,
      message: "Error",
    });
  }
});

module.exports = router;
