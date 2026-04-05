import express, { Router } from "express";
import { UserController } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/new-user", (req, res) => UserController.createUser(req, res));

router.post("/login", (req, res) => UserController.getUser(req, res));

router.get("/auth/google", (req, res) => UserController.googleAuthStart(req, res));

router.get("/auth/google/callback", (req, res) => UserController.googleAuthCallback(req, res));

router.get("/get-user", verifyToken, (req, res) =>
  UserController.getUserData(req, res),
);

router.patch("/update-user", verifyToken, (req, res) =>
  UserController.updateUserData(req, res),
);

export default router;
