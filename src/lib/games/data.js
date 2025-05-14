'use server'

import prisma from "../prisma";



export async function getJuegosPaginado({ offset, limit, where = {} }) {
  try {
    const games = await prisma.game.findMany({
      skip: offset,
      take: limit,
      where,
      orderBy: { releaseDate: 'desc' },
      include: {
        developers: true,
        fans: true,
      },
    });

    return games;
  } catch (error) {
    console.error("Error fetching paginated games:", error);
    throw new Error("Unable to fetch games. Please try again later.");
  }
}


export async function updateUser(userId, name, bio, birthdate, country) {
  try {
    const updateData = {};

    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (birthdate) updateData.birthDate = new Date(birthdate).toISOString();
    if (country) updateData.country = country;

    updateData.emailVerified = new Date().toISOString();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}


export async function updateUserProfilePerfileImagen(userId, imagenPerfil) {
  try {
    const updateData = {};

    if (imagenPerfil) updateData.image = imagenPerfil;
  

    updateData.emailVerified = new Date().toISOString();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}

export async function updateUserProfileBackImagen(userId, imagenFondo) {

console.log('🔥 Iniciando actualización de imagen de fondo de usuario');
console.log('🔥 userId:', userId)
console.log('🔥 imagenFondo:', imagenFondo);

  try {
    const updateData = {};

    if (imagenFondo) updateData.backgroundImage = imagenFondo;

    updateData.emailVerified = new Date().toISOString();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}


