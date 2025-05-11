import { Route, Routes } from "react-router-dom";
import Flights from "../pages/Flights";
import Checkout from "../pages/Checkout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Ticket from "../pages/Ticket";
import Dashboard from "../pages/Dashboard";

export default function Routers(){
    return(
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ticket" element={<Ticket />} />
        </Routes>
    )
}