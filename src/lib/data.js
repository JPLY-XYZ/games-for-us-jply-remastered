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