const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const postRouter = require("./routes/postRoutes");

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => {
    console.log("MONGO DB CONNECTION ERROR");
    console.log(e);
  });

app.enable("trust proxy");
app.use(cors({}));
app.use(express.json());

const port = process.env.PORT || 8000;

app.use("/api/v1/posts", postRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
