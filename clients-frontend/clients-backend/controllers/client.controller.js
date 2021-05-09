const { clients } = require("./../models/schemas");

class ClientController {
  create = async (req, res, next) => {
    try {
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        providers: req.body.providers,
      };
      await clients.countDocuments(
        { email: clientData.email },
        (err, count) => {
          if (count === 0) {
            const newClientData = clients.create(clientData);
            res.json(newClientData);
          } else {
            err = { message: "Client with this email already exists" };
            res.json(err.message);
          }
        }
      );
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new ClientController();
