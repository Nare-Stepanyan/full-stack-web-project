const express = require("express");
const providerController = require("./../controllers/provider.controller");
const clientController = require("./../controllers/client.controller");
const router = express.Router();

/**
 *  @swagger
 *      components:
 *          schemas:
 *              Clients:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: The auto-generated id of the client.
 *                      name:
 *                          type: string
 *                          required: true
 *                          description: The name of the client.
 *                      email:
 *                          type: string
 *                          required: true
 *                          description: Email of the client.
 *                      phone:
 *                          type: integer
 *                          required: true
 *                          description: Phone number of the client.
 *                      providers:
 *                          type: array
 *                          items:
 *                              type: string
 *
 */

/**
 *  @swagger
 *      components:
 *          schemas:
 *              Providers:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: The auto-generated id of the client.
 *                      name:
 *                          type: string
 *                          required: true
 *                          description: The name of the provider.
 *
 */

/**
 * @swagger
 * tags:
 *  name: Clients
 *  description: Client serving API-s
 */

/**
 * @swagger
 * tags:
 *  name: Providers
 *  description: Providers serving API-s
 */
/**
 *  @swagger
 *   /client:
 *      get:
 *          summary: Returns a list of clients
 *          tags: [Clients]
 *          description: Get all clients
 *          responses:
 *              200:
 *                  description: The list of clients
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Clients"
 *
 */

router.get("/client", clientController.get);

router.post("/client", clientController.create);

router.put("/client/:id", clientController.update);

router.delete("/client/:id", clientController.delete);

/**
 * @swagger
 * /provider:
 *      get:
 *          summary: Returns a list of providers
 *          tags: [Providers]
 *          description: Get all providers
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: The list of providers
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#components/schemas/Providers"
 *
 */

router.get("/provider", providerController.get);

/**
 * @swagger
 *  /provider:
 *      post:
 *          summary: Create a new provider
 *          tags: [Providers]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Providers"
 *      responses:
 *          200:
 *              description: The provider was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Providers"
 *          500:
 *              description: Server error
 */

router.post("/provider", providerController.create);

router.put("/provider/:id", providerController.update);

router.delete("/provider/:id", providerController.delete);

module.exports = router;
