// import { createTransport } from 'nodemailer';

// export const mailSender = async(email , subject , html) => {
//     try {
//         let transporter = createTransport({
//             host: "smtp.gmail.com",
//             auth: {
//                 user: "manishrajwarkusheldigisolution@gmail.com",
//                 pass: "wdaprqwcbjvigack",
//             },
//             tls: {
//                 rejectUnauthorized: false // Temporarily bypass certificate validation
//             }
//         });

//         let info = await transporter.sendMail({
//             from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
//             to: `${email}`,
//             subject: subject,
//             html: `${html}`
//         });

//         console.log("Email sent info: ", info);
//         return info;
//     } catch (error) {
//         console.log(error);
//     }
// }

import { createTransport } from "nodemailer";

export const mailSender = async (email, subject, html) => {
    const transporter = createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true,
        auth: {
            user: "info@kusheldigi.com",
            pass: "info@kushel12345"
        },
        from: "info@kusheldigi.com",
        tls: {
            rejectUnauthorized: false,
        },
    });
    await transporter.sendMail({
        from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
        to: `${email}`,
        subject: subject,
        html: `${html}`
    });
};

// auth: {
//   user: "webmaster.kushel@gmail.com",
//    pass:"fypnipkjntklyznj"
// },

