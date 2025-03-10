
import { createTransport } from "nodemailer";

export const mailSender = async (email, subject, html) => {
    const transporter = createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true,
        auth: {
            user: "aman.kusheldigi@gmail.com",
            pass: "Kushel@2025"
        },
        from: "aman.kusheldigi@gmail.com",
        tls: {
            rejectUnauthorized: false,
        },
    });
    await transporter.sendMail({
        from: 'Kushel Digi Solutions" <aman.kusheldigi@gmail.com>',
        to: `${email}`,
        subject: subject,
        html: `${html}`
    });
};


