const express = require("express");
const providerController = require("./../controllers/provider.controller");
const clientController = require("./../controllers/client.controller");
const router = express.Router();

router.post("/client", clientController.create);

/**
 * @swagger
 * /provider:
 *     post:
 *      summary: Creates a new provider.
 *      consumes:
 *      - application/json
 *      parameters:
 *      - in: body
 *      name: provider
 *      description: New providers name.
 *      schema:
 *        type: string
 *      responses:
 *       201:
 *        description: Created
 */

router.post("/provider", providerController.create);

/**
 * @swagger
 * /provider:
 *      get:
 *          description: Get all providers
 *          responses:
 *              200:
 *                  description: Success
 *
 */
router.get("/provider", providerController.get);

router.put("/provider/:id", providerController.update);

router.delete("/provider/:id", providerController.delete);

module.exports = router;
