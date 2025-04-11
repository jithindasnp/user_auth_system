import { Router } from "express";
import { register, login, dashboard } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validateLogin, validateRegister } from "../middlewares/auth.validator.js";

const router = Router();

router.post("/register",validateRegister, register);
router.post("/login",validateLogin, login);
router.get("/dashboard", authMiddleware, dashboard);

export default router;
