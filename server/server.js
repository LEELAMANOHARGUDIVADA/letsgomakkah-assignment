import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import userRoutes from "./routes/UserRoutes.js"
import flightRoutes from "./routes/FlightRoutes.js"
import paymentRoutes from "./routes/PaymentRoutes.js"
import ticketRoutes from "./routes/TicketRoutes.js"
import connectDB from "./db/db.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api/auth', userRoutes);
app.use('/api/flight', flightRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/v1/payment', paymentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB(process.env.MONGODB_URI);
    console.log("SERVER RUNNING ON PORT", PORT);
});