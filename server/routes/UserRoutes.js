import { Router } from "express";
import { login, register, verifyOtp } from "../controllers/UserController.js";

const router = Router();

router.post('/register', register);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);

export default router;