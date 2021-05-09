const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routesUrls = require("./routes/routes");
const PORT = process.env.PORT || 3001;

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});

app.use(express.json());
app.use(cors());
app.use("/", routesUrls);

app.use("/", (req, res, next) => {
  res.end("Home page");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
