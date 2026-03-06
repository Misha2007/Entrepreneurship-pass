import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./util/db.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";

const PORT = 3001;
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  }),
);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/users", userRoutes);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT,
    );
  else console.log("Error occurred, server can't start", error);
});
