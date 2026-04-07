import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import "./util/db.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
import expRoutes from "./routes/exp.js";
import passRoutes from "./routes/pass.js";

const PORT = 3001;

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.47.181:5173",
      "http://192.168.27.248:5173",
      "https://ettev-pass.netlify.app",
    ],
    methods: ["GET", "POST", "PATCH"],
  }),
);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/users", userRoutes);
app.use("/exps", expRoutes);
app.use("/passports", passRoutes);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT,
    );
  else console.log("Error occurred, server can't start", error);
});
