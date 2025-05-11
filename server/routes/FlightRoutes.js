import { Router } from "express"
import { citySearch, searchFlights } from "../controllers/FlightController.js";

const router = Router();

router.get('/citySearch', citySearch);
router.get('/searchFlights', searchFlights);

export default router;