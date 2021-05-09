const express = require("express");
const providerController = require("./../controllers/provider.controller");
const clientController = require("./../controllers/client.controller");

const router = express.Router();

// create a new client
router.post("/client", clientController.create);

// create a new provider
router.post("/provider", providerController.create);

// get all providers list
router.get("/provider", providerController.get);

module.exports = router;
