import prisma from '@/lib/prisma'

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
                  Comment: true,  // Incluye todos los comentarios relacionados con el contenido
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
