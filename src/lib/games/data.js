'use server'

import prisma from "../prisma";



export async function getJuegosPaginado({ offset, limit, where = {} }) {
  const games = await prisma.game.findMany({
    skip: offset,
    take: limit,
    where,
    orderBy: { releaseDate: "desc" },
  });
  return games;
}


export async function updateUser(userId, updateData) {
  try {
    // Actualizar el usuario en la base de datos
    const updatedUser = await prisma.user.update({
      where: { id: userId },  // Buscar por el ID del usuario
      data: {
        name: updateData.name,  // Actualiza el nombre si se proporciona
        bio: updateData.bio,    // Actualiza la bio si se proporciona
        birthDate: updateData.birthDate,  // Actualiza la fecha de nacimiento
        country: updateData.country,      // Actualiza el país
        image: updateData.image,  // Actualiza la imagen de perfil
        backgroundImage: updateData.backgroundImage, // Actualiza la imagen de fondo
      },
    });

    return updatedUser;  // Retorna el usuario actualizado
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}
