'use server'

// SERVER ACTION DE REPORTAR CUALQUIER CONTENIDO, COMENTARIO O JUEGO

import { revalidatePath } from "next/cache";
import { deactivateAcount, deleteComment, deleteContent, deleteGame, deleteUser, reportComment, reportContent, reportGame, reportUser, setFavoriteGame, setFavoriteThink, toggleVisibleComment, toggleVisibleContent, toggleVisibleGame } from "../data";
import { auth } from "@/auth";



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

    revalidatePath('/');
  } catch (error) {
    console.error('Error en reportAction:', error);
    throw error;
  }
}


export async function deleteAction(prevState, formData) {
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
        await deleteUser(id);
        break;
      case 'GAME':
        await deleteGame(+id);
        break;
      case 'CONTENT':
        await deleteContent(+id);
        break;
      case 'COMMENT':
        await deleteComment(+id);
        break;
      default:
        throw new Error('Tipo no soportado');
    }

     revalidatePath('/'); 
  } catch (error) {
    console.error('Error en deleteAction:', error);
    throw error;
  }
}

export async function togleVisibilitiAction(prevState, formData) {
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
      case 'GAME':
        await toggleVisibleGame(+id);
        break;
      case 'CONTENT':
        await toggleVisibleContent(+id);
        break;
      case 'COMMENT':
        await toggleVisibleComment(+id);
        break;
      default:
        throw new Error('Tipo no soportado');
    }

    revalidatePath('/');
  } catch (error) {
    console.error('Error en togleVisibilitiAction:', error);
    throw error;
  }
}

export async function suspenderAcount(prevState, formData) {
  if (!(formData instanceof FormData)) {
    throw new Error("formData no es una instancia de FormData");
  }
  const id = formData.get('id');
  deactivateAcount(id);
  revalidatePath('/');
}


// SERVER ACTION DE GUARDAR COMO FAVORITO UN JUEGO

export async function toggleFavoriteGameAction(prevState, formData) {
  const userId = formData.get('userid')
  const gameId = Number(formData.get('gameid'))


  if (!userId || !gameId) {
    throw new Error('Datos inválidos o no autenticado')
  }

  const result = await setFavoriteGame(userId, gameId)
 
  return result 
  
}

export async function toggleFavoriteAny({ tipo, id, sumar }) {
  // const id = Number(formData.get('id'))
  // const tipo = Number(formData.get('tipo'))
  // const sumar = Boolean(formData.get('sumar'))

  if (!id || !tipo) {
    throw new Error('Datos inválidos')
  }

  const result = await setFavoriteThink(tipo, id, sumar)
  return result // { status: 'added' | 'removed' }
}