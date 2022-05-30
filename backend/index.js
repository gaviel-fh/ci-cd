const express = require("express");
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
    useFindAndModify: false,
  })
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => {
    console.log(e);
    setTimeout(connectWithRetry, 5000);
  });

app.enable("trust proxy");
app.use(cors({}));
app.use(express.json());

const port = process.env.PORT || 8000;

app.use("/api/v1/posts", postRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
