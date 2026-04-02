import express, { Router } from "express";
import { verifyToken } from "../middlewares/authJwt.js";
import { ExpsController } from "../controllers/exps.js";

const router = Router();

router.post("/new-exp", verifyToken, (req, res) =>
  ExpsController.addExp(req, res),
);

export default router;
