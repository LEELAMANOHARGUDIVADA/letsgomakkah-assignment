import { Router } from "express"
import {generateTicket, getUserTickets} from "../controllers/TicketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/generateTicket', authMiddleware, generateTicket);
router.get('/userTickets', authMiddleware, getUserTickets);

export default router;