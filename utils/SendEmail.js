import { createTransport } from "nodemailer";

export const SendEmail = async (to, subject, text, html) => {
  // const transporter = createTransport({
  //   host: "smtpout.secureserver.net",
  //   port: 465,
  //   secure: true, 
  //   auth: {
  //     user: "Info@auxibleindia.com",
  //     pass: "info@1234"
  //   },
  //   from: "Info@auxibleindia.com",
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });
  // await transporter.sendMail({
  //   from: '"Auxible India" <Info@auxibleindia.com>',
  //   to,
  //   subject,
  //   text,
  //   html,
  // });
};

 // auth: {
    //   user: "webmaster.kushel@gmail.com",
    //    pass:"fypnipkjntklyznj"
    // },
