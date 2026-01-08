/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentCreated} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Create a transporter using environment variables for security
// DEPLOYMENT NOTE: Set specific env vars via CLI:
// firebase functions:config:set email.service="gmail" email.user="your@email.com" email.pass="your-app-password"
// OR use Google Cloud Secret Manager for better security
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use 'SendGrid', 'Mailgun', etc.
    auth: {
        user: process.env.EMAIL_USER || "placeholder@email.com",
        pass: process.env.EMAIL_PASS || "placeholder-password"
    }
});

exports.sendOnboardingEmail = onDocumentCreated("subscribers/{docId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        return;
    }

    const data = snapshot.data();
    const email = data.email;

    logger.info(`New subscriber: ${email}. Preparing onboarding email...`);

    const mailOptions = {
        from: '"Pascal Freyer" <contact@pascalfreyer.com>',
        to: email,
        subject: "Welcome to the Journey! 🚀 // Pascal.Freyer",
        html: `
            <div style="font-family: 'Courier New', monospace; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #00bcd4;">SYSTEM.MESSAGE_RECEIVED</h2>
                <p>Hey there,</p>
                <p><strong>Pascal here.</strong> Just wanted to personally thank you for joining my journey.</p>
                <p>You're now connected to my personal feed where I share:</p>
                <ul>
                    <li>My latest experiments with <strong>AI & Automation</strong></li>
                    <li>Behind-the-scenes of building startups like <strong>OneTicket</strong></li>
                    <li>Thoughts on the intersection of <strong>Tech & Policy</strong></li>
                </ul>
                <p>If you ever want to chat about an idea or need help with something, just hit reply. I read every email.</p>
                <br>
                <p>Best,</p>
                <p style="font-weight: bold; font-size: 1.2em;">Pascal Dominik Freyer</p>
                <p style="font-size: 0.8em; color: #888;">Founder | AI Engineer | Life-long Student</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 0.7em; color: #aaa; text-align: center;">
                    You received this because you signed up at <a href="https://pascalfreyer.com">pascalfreyer.com</a>.<br>
                    <a href="#" style="color: #888;">Unsubscribe</a>
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Onboarding email sent to ${email}`);

        // Optional: Update the document to mark email as sent
        return snapshot.ref.set({ emailSent: true, emailSentAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
    } catch (error) {
        logger.error("Error sending email:", error);
    }
});
