import express from "express";
import { Login } from "../controller/user.auth.js";

const router = express.Router();

router.post("/auth/login", Login);

export default router;
