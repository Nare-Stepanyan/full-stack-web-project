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

  update = async (req, res, next) => {
    try {
      const client = await clients.findOne({
        _id: req.params.id,
      });
      if (!client) throw error;

      req.body.name && (client.name = req.body.name);
      req.body.email && (client.email = req.body.email);
      req.body.phone && (client.phone = req.body.phone);
      req.body.providers && (client.providers = req.body.providers);
      await client.save();
      res.json(client.toObject());
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
