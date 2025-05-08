'use server'

import { getJuegosPaginado } from "./data";

export async function obtenerJuegosPaginados({ page, pageSize = 6, where = {} }) {
  const offset = page * pageSize;
  const juegos = await getJuegosPaginado({ offset, limit: pageSize, where });
  const hayMas = juegos.length === pageSize;
  return { juegos, hayMas };
}
