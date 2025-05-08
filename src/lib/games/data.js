'use server'

import prisma from "../prisma";



export async function getJuegosPaginado({ offset, limit, where = {} }) {
  const games = await prisma.game.findMany({
    skip: offset,
    take: limit,
    where,
    orderBy: { releaseDate: "desc" },
    select: {
      id: true,
      name: true,
      shortDesc: true,
      releaseDate: true,
      urls: true,
      categories: { select: { name: true } },
    },
  });
  return games;
}
