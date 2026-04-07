import express, { Router } from "express";
import { verifyToken } from "../middlewares/authJwt.js";
import { PassController } from "../controllers/pass.js";

const router = Router();

router.post("/new-pass", verifyToken, (req, res) =>
  PassController.addPass(req, res),
);

router.get("/get-pass/:passId", verifyToken, (req, res) =>
  PassController.getPassById(req, res),
);

export default router;
