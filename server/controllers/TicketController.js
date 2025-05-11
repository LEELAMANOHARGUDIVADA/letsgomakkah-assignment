import Ticket from "../models/TicketSchema.js";
import User from "../models/UserSchema.js";

const generateTicket = async(req,res) => {
    try {
        const { from, to, adults, price, seats, departureDate, arrivalDate, payment_id } = req.body;

        if(!from || !to || !adults || !price ||  !seats || !departureDate || !arrivalDate || !payment_id || !req.user){
            throw new Error("All Fields Are Required");
        }

        const ticket = new Ticket({
            from,
            to,
            adults,
            price,
            seats,
            departureDate,
            arrivalDate,
            payment_id,
            user: req.user.id
        });
        await ticket.save();

        const user = await User.findByIdAndUpdate(req.user.id, {
            $push: {
                tickets: ticket
            }
        });
        await user.save();

        return res.status(201).json({ success: true, message: "Ticket Generated", ticket });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getUserTickets = async(req,res) => {
    try {
       const user = await User.findById(req.user.id).populate("tickets");
       
       if(!user){
        return res.status(404).json({ success: false, message: "User Not Found" });
       }

       return res.status(200).json({ success: true, message: "User Tickets Fetched", tickets: user.tickets });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { generateTicket, getUserTickets };