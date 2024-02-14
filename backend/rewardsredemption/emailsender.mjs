import express from 'express';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid'; // Generating unique redemption codes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'classtriviasg@gmail.com', 
    pass: 'Y;2*TN{tAD`}cf9H' 
  }
});

app.post('/redeem', async (req, res) => {
  try {
    const { itemName, email } = req.body;

    // Generate redemption code
    const redemptionCode = uuidv4();

    // Send email with redemption code
    await transporter.sendMail({
      from: 'classtriviasg@gmail.com', 
      to: email || 'javinjj.22@ichat.sp.edu.sg', // Default to my email for testing if none included
      subject: 'Redemption Information',
      html: `
        <p>Thank you for redeeming ${itemName}.</p>
        <p>Your redemption code: ${redemptionCode}.</p>
        <p>Please redeem it within 30 days from this email.</p>
      `
    });

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
