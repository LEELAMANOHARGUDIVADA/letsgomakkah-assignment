import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Ticket = new mongoose.model('Ticket', ticketSchema);

export default Ticket;