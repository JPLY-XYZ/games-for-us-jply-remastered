"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

import prisma from "../prisma";


import crypto from 'crypto';
import { redirect } from 'next/navigation';

function generateTokenFromId(id, length = 16) {
    const idStr = id.toString().slice(0, length);
    const randomPart = crypto.randomBytes(length).toString('base64').replace(/\W/g, '').slice(0, length);
    const combined = (idStr + randomPart).slice(0, length);

    // Opcional: barajar los caracteres para hacerlo menos predecible
    return combined.split('').sort(() => 0.5 - Math.random()).join('');
}

import nodemailer from 'nodemailer';


export async function SendVerifyEmail(email, id) {
  const token = generateTokenFromId(id, 32);

  await prisma.user.update({
    where: { id },
    data: { verificationToken: token },
  });

  const verificationLink = `${process.env.NEXTAUTH_URL}/verificar?token=${token}&userEmail=${email}`;

 const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #333;">
      <h2>Verifica tu correo electrónico</h2>
      <p>Hola,</p>
      <p>Gracias por registrarte en Games For Us. Para completar el proceso, por favor verifica tu dirección de correo haciendo clic en el siguiente botón:</p>
      <a href="${verificationLink}" 
         style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;">
         Verificar correo
      </a>
      <p>Si no has creado una cuenta, puedes ignorar este mensaje.</p>
      <div style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
        &copy; 2025 GAMES FOR US V 1.1. Todos los derechos reservados.
      </div>
    </div>
  </div>
`;


  await sendEmail({
    to: email,
    subject: 'Verifica tu cuenta de Games For Us',
    html,
  });
}



export async function verifyEmail(id, token) {

  const result = await prisma.user.updateMany({
    where: {
      id: id,
      verificationToken: token,
    },
    data: {
      verificationToken: null,
      emailVerified: new Date(),
      active: true,
    },
  });

  if (result.count === 0) {
    redirect("/login?error=InvalidToken");
  }

   redirect("/login?error=LoginAgain");

  
}




export async function sendEmail({ to, subject, html }) {
  // Configura el transporte SMTP de Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.GOOGLE_EMAIL_USER,
      pass: process.env.GOOGLE_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Games For Us" <tuemail@gmail.com>',
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
}