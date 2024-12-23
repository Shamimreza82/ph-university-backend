import nodemailer from 'nodemailer';
import { envFile } from '../../config';

export const sendEmail = async (to: string, html: string) => {
  console.log(to);
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false ,// true for port 465, false for other ports
      auth: {
        user: 'shamimrezabd67@gmail.com',
        pass: 'mwcv snpc oihd amlv',
      },
    });

    const info = await transporter.sendMail({
      from: "<shamimrezabd67@gmail.com>", // sender address
      to, // list of receivers
      subject: "Password Reset Request", // Subject line
      text: "Make password change in under 10 minis", // plain text body
      html, // html body
    });
  
    console.log("Message sent: %s", info.messageId);

  } catch (error) {
    console.log(error);
  }
};
