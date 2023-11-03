const express = require("express");
const cors = require("cors");
const connection = require("./database/server");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`connected to database`);
  } catch (err) {
    console.log(`error in connecting ${err}`);
  }
  console.log("server is running on", PORT);
});
