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
        async (err, count) => {
          if (count === 0) {
            const newClientData = await clients.create(clientData);
            res.send(newClientData);
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

  get = async (req, res, next) => {
    try {
      await clients.find({}, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const client = await clients.findOneAndDelete({
        _id: req.params.id,
      });

      if (!client) throw error;
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new ClientController();
