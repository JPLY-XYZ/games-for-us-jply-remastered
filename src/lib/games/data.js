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

