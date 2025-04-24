import prisma from '@/lib/prisma'
import { ContentType } from '@prisma/client';

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      favoriteGames: true,
      developedGames: true,
      _count: {
        select: {
          contents: true,
          comments: true
        }
      }
    }
  });
  return user;
}


export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  return user
}


export async function getGameById(id) {
  const game = await prisma.game.findUnique({
    where: {
      id: id,  // Asegúrate de que `id` sea el tipo correcto (entero)
    },
    include: {
      contents: {
        include: {
          user: true,  // Incluye todos los campos de `User` asociados al contenido
          comments: true,  // Incluye todos los comentarios relacionados con el contenido
        }
      },
      comments: {
        include: {
          user: true,  // Incluye todos los campos de `User` relacionados con el comentario
          content: true,  // Incluye los datos de `Content` si el comentario está relacionado con uno
        }
      },
      fans: true,  // Incluye todos los campos de los fans (usuarios que siguen el juego)
      developers: true,  // Incluye todos los campos de los desarrolladores (usuarios que desarrollaron el juego)
      categories: true,  // Incluye todos los campos de las categorías del juego
      platforms: true,  // Incluye todos los campos de las plataformas en las que está disponible el juego
    },
  });

  return game;
}

export async function getContentById(id) {
  try {
    const content = await prisma.content.findUnique({
      where: {
        id: Number(id), // Asegúrate de que el id sea numérico
      },
      include: {
        user: {
          include: {
            contents: true,
            comments: true,
            favoriteGames: true,
            developedGames: true,
          },
        },
        game: {
          include: {
            categories: true,
            platforms: true,
            developers: true,
            fans: true,
          },
        },
        comments: {
          include: {
            user: {
              include: {
                contents: true,
                comments: true,
              },
            },
          },
        },
      },
    });

    return content;
  } catch (error) {
    console.error("Error al obtener el contenido:", error);
    return null;
  }
}


export async function getLatestGames() {
  return await prisma.game.findMany({
    where: {
      releaseDate: { not: null },
    },
    orderBy: {
      releaseDate: 'desc',
    },
    take: 3,
    include: {
      categories: true,
      platforms: true,
      fans: true,
      developers: true,
      _count: {
        select: {
          contents: true,
          comments: true,
          fans: true,
        },
      },
    },
  });
}

export async function getLatestNews() {
  return await prisma.content.findMany({
    where: {
        type: ContentType.NOTICIA,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 3,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      game: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: true, // relación correctamente nombrada
      _count: {
        select: {
          comments: true, // también correcto aquí
        },
      },
    },
  });
}


export async function getLatestContents() {
  return await prisma.content.findMany({
    where: {
      NOT: {
        type: ContentType.NOTICIA, // Excluir noticias
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 3, // O el número que necesites
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      game: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: true, 
      _count: {
        select: {
          comments: true, // también correcto aquí
        },
      },
    },
  });
}



// reportes

export async function reportUser(userId) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      reportCount: { increment: 1 },
    },
  });
}

export async function reportGame(gameId) {
  return await prisma.game.update({
    where: { id: gameId },
    data: {
      reportCount: { increment: 1 },
    },
  });
}

export async function reportContent(contentId) {
  return await prisma.content.update({
    where: { id: contentId },
    data: {
      reportCount: { increment: 1 },
    },
  });
}

export async function reportComment(commentId) {
  return await prisma.comment.update({
    where: { id: commentId },
    data: {
      reportCount: { increment: 1 },
    },
  });
}

// deletes

export async function deleteContentById(id) {
  try {
    const deleted = await prisma.content.delete({
      where: { id },
    });
    return deleted;
  } catch (error) {
    console.error('Error al eliminar el contenido:', error);
    throw new Error('No se pudo eliminar el contenido');
  }
}

export async function deleteGameById(id) {
  try {
    const deleted = await prisma.game.delete({
      where: { id },
    });
    return deleted;
  } catch (error) {
    console.error('Error al eliminar el contenido:', error);
    throw new Error('No se pudo eliminar el contenido');
  }
}



//juegos favoritos


export async function setFavoriteGame(userId, gameId) {
  const isFan = await prisma.user.findFirst({
    where: {
      id: userId,
      favoriteGames: {
        some: { id: gameId }
      }
    },
    select: { id: true }
  });

  if (isFan) {
    // Ya es fan, quitamos
    await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteGames: {
          disconnect: { id: gameId }
        }
      }
    });
    return { status: 'removed' };
  } else {
    // No es fan, lo añadimos
    await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteGames: {
          connect: { id: gameId }
        }
      }
    });
    return { status: 'added' };
  }
}


// nuevo comentario

// Función que se encarga solo de la creación del comentario
export const newComment = async (data) => {
  try {
    return await prisma.comment.create({ data });
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    throw new Error('No se pudo crear el comentario.');
  }
};


