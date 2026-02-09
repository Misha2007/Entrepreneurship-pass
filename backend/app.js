const express = require("express");
const PORT = 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./util/db");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT,
    );
  else console.log("Error occurred, server can't start", error);
});
