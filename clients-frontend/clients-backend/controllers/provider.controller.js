const { providers } = require("./../models/schemas");

class ProviderController {
  create = async (req, res, next) => {
    try {
      const providerData = {
        name: req.body.name,
      };
      await providers.countDocuments(
        { name: providerData.name },
        (err, count) => {
          if (count === 0) {
            const newProvider = providers.create(providerData);
            res.json(newProvider);
          } else {
            err = { message: "Such provider already exists" };
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
      await providers.find({}, function (err, result) {
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
}

module.exports = new ProviderController();