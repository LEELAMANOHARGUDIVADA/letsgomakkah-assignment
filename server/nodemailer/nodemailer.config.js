import nodmailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({ path: './.env' });

const transport = nodmailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export default transport;