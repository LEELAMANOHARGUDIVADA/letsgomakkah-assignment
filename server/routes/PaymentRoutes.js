import { Router } from "express"
import { createOrder, deductWalletBalance, getWalletBalance } from "../controllers/PaymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/createOrder', createOrder);
router.get('/getWalletBalance', authMiddleware, getWalletBalance);
router.post('/deductWalletBalance', authMiddleware, deductWalletBalance);

export default router;