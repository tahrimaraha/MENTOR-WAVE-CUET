/* Simple Express server to send verification codes via Gmail (Nodemailer)
   Usage:
   - Create a .env with GMAIL_USER and GMAIL_PASS (app password recommended)
   - Run: npm install && npm start
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// /send-verification
app.post('/send-verification', async (req, res) => {
  try {
    const { to_email, to_name, code, app_name } = req.body;
    if (!to_email || !code) return res.status(400).json({ error: 'Missing to_email or code' });

    // create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.GMAIL_USER,
      to: to_email,
      subject: `${app_name || 'Mentor Wave'} - Your verification code`,
      text: `Your verification code is: ${code}\n\nIf you did not request this, please ignore this email.`,
      html: `<p>Hello ${to_name || ''},</p><p>Your verification code for <strong>${app_name || 'Mentor Wave'}</strong> is:</p><h2>${code}</h2><p>If you didn't request this, ignore this email.</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    return res.json({ success: true, info });
  } catch (err) {
    console.error('send-verification error', err);
    return res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Email sender listening on port ${PORT}`);
});
