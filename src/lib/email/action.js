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

export async function SendVerifyEmail(email, id) {
    const token = generateTokenFromId(id, 32); // Token de 32 caracteres


    console.log("email: " + email   )

    console.log('Token generado:', token);

    await prisma.user.update({
        where: { id: id },
        data: { verificationToken: token }
    });





    const test = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verifica tu cuenta de Games For Us',
        html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 40px 0;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #333;">
          <h2>Verifica tu correo electrónico</h2>
          <p>Hola,</p>
          <p>Gracias por registrarte. Para completar el proceso, por favor verifica tu dirección de correo haciendo clic en el siguiente botón:</p>
          <a href="${process.env.NEXTAUTH_URL}/verificar?token=${token}&userEmail=${email}" 
             style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;">
             Verificar correo
          </a>
          <p>Si no has creado una cuenta, puedes ignorar este mensaje.</p>
          <div style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
            &copy; 2025 Tu Empresa. Todos los derechos reservados.
          </div>
        </div>
      </div>
    `
    });


    console.log(test);
     
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


