const express = require("express");
const clientTemplate = require("./../models/clients.schema");
const providerTemplate = require("./../models/providers.schema");

const router = express.Router();

router.post("/client", (req, res) => {
  const client = new clientTemplate({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    providers: req.body.providers,
  });
  client
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

router.post("/provider", (req, res) => {
  const provider = new providerTemplate({
    name: req.body.name,
  });
  provider
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("./clientList", (req, res) => {
  console.log(`Get client list`);
});

module.exports = router;
