import User from "../models/UserSchema.js";
import razorpay from "../razorpay/razorpay.config.js";

const createOrder = async(req,res) => {
    try {
        const { amount } = req.body;
        
        if(!amount){
            throw new Error("Invalid Amount");
        }

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpay.orders.create(options);

        return res.status(201).json({ success: true, message: "Payment Order Created", order });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getWalletBalance = async(req,res) => {
    try {
        if(!req.user){
            return res.status(400).json({ success: false, message: "Invalid User Id" });
        }

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({ success: false, message: "User Not Found" });

        }
        return res.status(200).json({ success: true, message: "Wallet Balance Fetched", walletBalance: user.wallet })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deductWalletBalance = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.wallet < amount) {
            return res.status(400).json({ success: false, message: "Insufficient wallet balance" });
        }

        user.wallet -= amount;
        await user.save();

        return res.status(200).json({ success: true, message: "Wallet balance deducted"});
    } catch (error) {
        console.error("Wallet Deduction Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { createOrder, getWalletBalance, deductWalletBalance };