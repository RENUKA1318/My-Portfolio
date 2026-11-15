
const db = require("../config/db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

exports.addContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Save contact details in MySQL
        const sql = `
            INSERT INTO contacts
            (name, email, subject, message)
            VALUES (?, ?, ?, ?)
        `;

        await db.execute(sql, [
            name,
            email,
            subject || "",
            message
        ]);

        // Send email notification
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            replyTo: email,
            subject: "New Portfolio Contact Message",
            text: `
                New message received!

                Name: ${name}
                Email: ${email}
                Subject: ${subject || "No subject"}

                Message:
                ${message}
            `
        });

        res.status(201).json({
            message: "Message saved and email notification sent!"
        });

    } catch (error) {
        console.error("Contact Error:", error);

        res.status(500).json({
            message: "Message could not be processed"
        });
    }
};
