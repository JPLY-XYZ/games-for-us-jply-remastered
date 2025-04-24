'use server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { auth, signIn, signOut } from '@/auth';
import { getUserByEmail, newComment, reportComment, reportContent, reportGame, reportUser, setFavoriteGame } from '@/lib/data';
import { revalidatePath } from 'next/cache';


// REGISTER
export async function register(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

    if (user) {
        return {
            error: 'El email ya está registrado',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Encriptamos password 
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Registro correcto" }
}



// LOGIN credentials
export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await getUserByEmail(email);

    if (!user) {
        return {
            error: 'Usuario no registrado.',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Comparamos password 
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        await signIn('credentials',
            {
                email, password,
                redirectTo: globalThis.callbackUrl
            })
        return { success: "Inicio de sesión correcto" }
    } else {
        return {
            error: 'Credenciales incorrectas.',
            fields: Object.fromEntries(formData.entries())
        }
    }

}

// LOGIN google
export async function loginGoogle() {
    try {
        await signIn('google', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGIN steam
export async function loginReddit() {
    try {
        await signIn('reddit', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}


// LOGIN discord
export async function loginDiscord() {
    try {
        await signIn('discord', { redirectTo: globalThis.callbackUrl })
    } catch (error) {
        console.log(error);
        throw error
    }
}


// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}



// funciones utilidades web

export async function reportAction(prevState, formData) {
    if (!(formData instanceof FormData)) {
        throw new Error("formData no es una instancia de FormData");
    }

    const id = formData.get('id');
    const tipo = formData.get('tipo');

    if (!id || !tipo) {
        throw new Error('Datos incompletos');
    }

    try {
        switch (tipo) {
            case 'USER':
                await reportUser(+id);
                break;
            case 'GAME':
             await reportGame(+id);
                break;
            case 'CONTENT':
                await reportContent(+id);
                break;
            case 'COMMENT':
                await reportComment(+id);
                break;
            default:
                throw new Error('Tipo no soportado');
        }

        // revalidatePath('/');
    } catch (error) {
        console.error('Error en reportAction:', error);
        throw error;
    }
}


// favorito

export async function toggleFavoriteAction(prevState,formData) {
    const session = await auth()
    const userId = session?.user?.id
    const gameId = Number(formData.get('gameId'))
  

    if (!userId || !gameId) {
      throw new Error('Datos inválidos o no autenticado')
    }
  
    const result = await setFavoriteGame(userId, gameId)
    return result // { status: 'added' | 'removed' }
  }

  export async function enviarComentario(prevState, formData) {
    const comentario = formData.get('comentario');
    const rating = Number(formData.get('rating'));
    const gameId = Number(formData.get('gameId'));
    const contentId = Number(formData.get('contentId'));
    const path = formData.get('path');
  
console.log(comentario, rating, gameId, contentId)

    if (!comentario || (!gameId && !contentId) || (gameId && contentId)) {
      return { success: false, error: 'Datos inválidos.' };
    }
  
    const session = await auth();
    const userId = session?.user?.id;
  
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado.' };
    }
  
    const data = {
        text: comentario,
        score: rating || null,
        user: { connect: { id: userId } },
        ...(gameId ? { game: { connect: { id: gameId } } } : {}),
        ...(contentId ? { content: { connect: { id: contentId } } } : {})
      };
      
  revalidatePath(path)
  
    try {
      const comment = await newComment(data);
      return { success: true, comment };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
  