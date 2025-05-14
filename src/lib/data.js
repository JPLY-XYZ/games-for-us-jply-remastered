'use server'
import prisma from '@/lib/prisma'
import { ContentType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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

export async function getAllUsersSimple() {
  const users = await prisma.user.findMany({});
  return users;
}
export async function getAllContentsSimple() {
  const contents = await prisma.content.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      game: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return contents;
}

export async function getAllGamesSimple() {
  const games = await prisma.game.findMany({});
  return games;
}
export async function getAllCommentsSimple() {
  const comments = await prisma.comment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      game: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return comments;
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
      id: id,
    },
    include: {
      contents: {
        include: {
          user: true,
          comments: true,
          _count: {
            select: {
              comments: true,
            },
          },
        }
      },
      comments: {
        include: {
          user: true,
          content: true,
        }
      },
      fans: true,
      categories: true,
      platforms: true,

      // 🔽 Aquí ajustamos para incluir info adicional de los desarrolladores
      developers: {
        include: {
          developedGames: {
            select: {
              id: true,
              name: true,
              shortDesc: true,
            },
          },
          comments: true,
          favoriteGames: {
            select: {
              id: true,
            },
          },
        },
      },
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
export async function getContentLikesById(id) {
  try {
    const content = await prisma.content.findUnique({
      where: {
        id: Number(id), // Asegúrate de que el id sea numérico
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
      visible: true,
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
      visible: true,
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
       visible: true,
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



// REPORT

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

// DELETES


//HIDES

// Hacer flip-flop del estado visible de un juego
export async function toggleVisibleGame(gameId) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  console.log("desde toggleVisibleGame", game)

  const newVisibleState = !game.visible; // Cambia el estado de visible

  await prisma.game.update({
    where: { id: gameId },
    data: {
      visible: newVisibleState,
    },
  });
revalidatePath('/');
  return { status: newVisibleState ? 'Visible' : 'Oculto' };
  
}

// Hacer flip-flop del estado visible de un contenido
export async function toggleVisibleContent(contentId) {
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  const newVisibleState = !content.visible; // Cambia el estado de visible

  await prisma.content.update({
    where: { id: contentId },
    data: {
      visible: newVisibleState,
    },
  });

  return { status: newVisibleState ? 'Visible' : 'Oculto' };
}

// Hacer flip-flop del estado visible de un comentario
export async function toggleVisibleComment(commentId) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  const newVisibleState = !comment.visible; // Cambia el estado de visible

  await prisma.comment.update({
    where: { id: commentId },
    data: {
      visible: newVisibleState,
    },
  });

  return { status: newVisibleState ? 'Visible' : 'Oculto' };
}






// BORRAR UN USUARIO
export async function deleteUser(userId) {
  await prisma.$transaction([
    // Eliminar relaciones en tablas intermedias (favoritos, desarrollados, etc.)
    prisma.user.update({
      where: { id: userId },
      data: {
        favoriteGames: { set: [] },
        developedGames: { set: [] },
      },
    }),
    // Eliminar primero comentarios y contenidos del usuario
    prisma.comment.deleteMany({
      where: { userId: userId },
    }),
    prisma.content.deleteMany({
      where: { userId: userId },
    }),
    // Luego eliminar el usuario
    prisma.user.delete({
      where: { id: userId },
    }),
  ]);
}

// BORRAR UN JUEGO
export async function deleteGame(gameId) {
  await prisma.$transaction([
    // Eliminar relaciones en tablas intermedias (categorías, plataformas, fans, developers)
    prisma.game.update({
      where: { id: gameId },
      data: {
        categories: { set: [] },
        platforms: { set: [] },
        fans: { set: [] },
        developers: { set: [] },
      },
    }),
    // Eliminar primero comentarios y contenidos del juego
    prisma.comment.deleteMany({
      where: { gameId: gameId },
    }),
    prisma.content.deleteMany({
      where: { gameId: gameId },
    }),
    // Luego eliminar el juego
    prisma.game.delete({
      where: { id: gameId },
    }),
  ]);
}

// BORRAR UN CONTENIDO
export async function deleteContent(contentId) {
  await prisma.$transaction([
    // Eliminar primero los comentarios relacionados al contenido
    prisma.comment.deleteMany({
      where: { contentId: contentId },
    }),
    // Luego eliminar el contenido
    prisma.content.delete({
      where: { id: contentId },
    }),
  ]);
}

// BORRAR UN COMENTARIO
export async function deleteComment(commentId) {
  await prisma.comment.delete({
    where: { id: commentId },
  });
}


export async function deactivateAcount(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user.active) {
    // Ya es fan, quitamos
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          active: false,
        },
      }),
    ]);
    return { status: 'Desactivado' };
  } else {
    // No es fan, lo añadimos
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          active: true,
        },
      }),
    ]);
    return { status: 'Activado' };
  }

}




//FUNCION SIMPLE PARA OBTENER SI ES PROPIETARIO


export async function isOwner(userId, targetId, type) {

  console.log("desde isOwner", userId, targetId, type)

  switch (type) {
    case "GAME":
      const game = await prisma.game.findUnique({
        where: { id: Number(targetId) },
        select: {
          developers: {
            where: { id: userId },
            select: { id: true },
          },
        },
      });
      return game?.developers.length > 0;

      case "USER":
      
      return userId === targetId;

    case "CONTENT":
      const content = await prisma.content.findUnique({
        where: { id: Number(targetId) },
        select: {
          userId: true,
        },
      });
      return content?.userId === userId;

    case "COMMENT":
      const comment = await prisma.comment.findUnique({
        where: { id: Number(targetId) },
        select: {
          userId: true,
        },
      });
      return comment?.userId === userId;

    default:
      throw new Error("Tipo no válido");
  }
}



//ELIMINAR PRONTO REFACTORIZACION

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


export async function setFavoriteGame( userId, gameId) {
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

export async function setFavoriteThink(tipo, id, sumar) {
  if (tipo === 'COMMENT') {
    if (sumar) {
      // Incrementar el score
      await prisma.comment.update({
        where: { id: id },
        data: {
          score: {
            increment: 1
          }
        }
      });
      return { status: 'added' };
    } else {
      // Decrementar el score
      await prisma.comment.update({
        where: { id: id },
        data: {
          score: {
            decrement: 1
          }
        }
      });
      return { status: 'removed' };
    }
  } else {
    if (sumar) {
      // Incrementar el score
      await prisma.content.update({
        where: { id: id },
        data: {
          score: {
            increment: 1
          }
        }
      });
      return { status: 'added' };
    } else {
      // Decrementar el score
      await prisma.content.update({
        where: { id: id },
        data: {
          score: {
            decrement: 1
          }
        }
      });
      return { status: 'removed' };
    }
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








export async function buscar(query) {
  if (!query) return {}

  const juegos = await prisma.game.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
    },
    select: {
      id: true,
      name: true,
      price: true,
      averageScore: true,
      urls: true, // JSON completo
    },
    take: 5,
  })

  const usuarios = await prisma.user.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
    take: 5,
  })

  const contenidos = await prisma.content.findMany({
    where: {
      title: { contains: query, mode: 'insensitive' },
    },
    select: {
      id: true,
      title: true,
      type: true,
      moreInfo: true, // JSON completo
    },
    take: 5,
  })

  return {
    Juegos: juegos.map(j => ({
      id: j.id,
      name: j.name,
      type: 'Juego',
      price: j.price,
      score: j.averageScore,
      image: j.urls && typeof j.urls === 'object' ? j.urls.images?.cover ?? null : null,
    })),
    Usuarios: usuarios.map(u => ({
      id: u.id,
      name: u.name,
      type: 'Usuario',
      image: u.image ?? null,
    })),
    Contenidos: contenidos.map(c => ({
      id: c.id,
      name: c.title,
      type: 'Contenido',
      contentType: c.type,
      image: c.moreInfo && typeof c.moreInfo === 'object' ? c.moreInfo.thumbnail ?? null : null,
    })),
  }
}

export async function createNewContent(data) {

  console.log(data, "llegado a create new content")

  const {
    userId,
    gameId,
    type,
    title,
    shortTitle,
    text,
    urls,
    moreInfo,
    score,
  } = data;

  if (!userId || !gameId || !title || !type) {
    throw new Error("Faltan campos requeridos.");
  }

  return await prisma.content.create({
    data: {
      user: {
        connect: { id: userId }
      },
      game: {
        connect: { id: gameId }
      },
      type,
      title,
      shortTitle,
      text,
      urls,
      moreInfo,
      score,
    },
  });
}

export async function getAllGames() {
  const games = await prisma.game.findMany({
    include: {
      contents: {
        include: {
          user: true,
          comments: true,
          _count: {
            select: {
              comments: true,
            },
          },
        }
      },
      comments: {
        include: {
          user: true,
          content: true,
        }
      },
      fans: true,
      categories: true,
      platforms: true,
      developers: {
        include: {
          developedGames: {
            select: {
              id: true,
              name: true,
              shortDesc: true,
            },
          },
          comments: true,
          favoriteGames: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return games;
}
