import { useContext, useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import ActiveComponentContext from "../context/ActiveComponentContext";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const token = localStorage.getItem('token');
            const { activeComponent, setActiveComponent } = useContext(ActiveComponentContext);
    

    const getUserTickets = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/ticket/userTickets`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTickets(response.data.tickets);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserTickets();
    }, [])
    return (
        <div className="w-full bg-white p-5">
            <div>
                <div onClick={() => setActiveComponent("Home")} className="cursor-pointer">
                    <ArrowLeft />
                </div>
                <h3 className="text-xl font-semibold flex items-center justify-center">My Flights</h3>
            </div>

            <div className="w-full space-y-5 mt-10 mb-16 flex flex-col items-center justify-center">
                {tickets?.length > 0 ? (tickets.reverse().map((ticket, index) => (
                    <div key={index} className="w-full md:flex items-center justify-center" >
                        <TicketCard flightData={ticket} />
                    </div>
                ))) : (
                    <div>
                        No Tickets Found
                    </div>
                )}
            </div>
        </div>
    )
}