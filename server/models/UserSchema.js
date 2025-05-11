import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verificationCode: Number,
    isVerified: {
        type: Boolean,
        default: false
    },
    wallet: {
        type: Number,
        default: 50000
    },
    tickets: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Ticket'
        }
    ],
}, { timestamps: true });

const User = new mongoose.model('User', userSchema);

export default User;