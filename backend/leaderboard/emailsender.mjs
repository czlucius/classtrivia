import express from 'express';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid'; // Generating unique redemption codes
import cors from 'cors';
import bodyParser from "body-parser";

const emailSender = express.Router();
const PORT = process.env.PORT || 3000;

emailSender.use(bodyParser.json());
emailSender.use(cors());

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'classtrivia@hotmail.com',
        pass: 'Y;2*TN{tAD`}cf9H'
    }
});


emailSender.post('/redeem', async (req, res) => {
    try {
        const { itemName, email } = req.body;

        console.log('Received redeem request:', itemName, email);

        // Generate redemption code
        const redemptionCode = uuidv4();

        console.log('Generated redemption code:', redemptionCode);

        // Send email with redemption code
        await transporter.sendMail({
            from: 'classtrivia@hotmail.com',
            to: email || 'javinjj.22@ichat.sp.edu.sg', // Default to my email for testing if none included
            subject: 'Redemption Information',
            html: `
        <p>Thank you for redeeming ${itemName}.</p>
        <p>Your redemption code: ${redemptionCode}.</p>
        <p>Please redeem it within 30 days from this email.</p>
      `
        });

        console.log('Email sent successfully');

        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default emailSender;

