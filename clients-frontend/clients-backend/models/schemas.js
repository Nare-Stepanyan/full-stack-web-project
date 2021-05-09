const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  providers: {
    type: [{ type: ObjectId, ref: "provider" }],
  },
});

const providerSchema = new Schema({
  name: {
    type: String,
  },
});

const clients = mongoose.model("client", clientSchema);
const providers = mongoose.model("provider", providerSchema);

module.exports = { clients, providers };
