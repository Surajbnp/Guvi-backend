const express = require("express");
const cors = require("cors");
const connection = require("./database/server");
const userController = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("Homepage");
});

// all routes containing "/user" will divert to userController
app.use("/user", userController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`connected to database`);
  } catch (err) {
    console.log(`error in connecting ${err}`);
  }
  console.log("server is running on", PORT);
});
