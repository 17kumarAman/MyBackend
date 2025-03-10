import { createTransport } from "nodemailer";

export const SendEmail = async (to, subject, text, html) => {
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
    from: '"Kushel Digi Solutions" <aman.kusheldigi@gmail.com>',
    to,
    subject,
    text,
    html,
  });
};

 // auth: {
    //   user: "webmaster.kushel@gmail.com",
    //    pass:"fypnipkjntklyznj"
    // },
