const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Insertar usuarios
async function seedUsuarios() {
  const usuarios = await Promise.all(
    Array.from({ length: 10 }, (_, i) => {
      return prisma.user.create({
        data: {
          name: `usuario${i + 1}`,
          email: `usuario${i + 1}@example.com`,
          password: `contrasena${i + 1}`,
          birthDate: new Date(1990 + i, i % 12, 1),
          country: ['España', 'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 'Venezuela', 'Ecuador', 'Bolivia', 'Uruguay'][i],
          bio: `Biografía de usuario${i + 1}`,
          avatar: `https://placehold.co/600x600?text=Avatar+${i + 1}`,
          backgroundImage: `https://placehold.co/600x600?text=Fondo+${i + 1}`,
          role: 'USUARIO',
        },
      });
    })
  );
  console.log('Usuarios creados:', usuarios);
  return usuarios;
}

// Insertar juegos
async function seedJuegos() {
  const juegos = await Promise.all(
    Array.from({ length: 10 }, (_, i) => {
      return prisma.game.create({
        data: {
          name: `Juego ${i + 1}`,
          shortDesc: `Desc. corta ${i + 1}`,
          longDesc: `Descripción larga ${i + 1}`,
          releaseDate: new Date(2022, i % 12, 1),
          editor: `Editor ${i + 1}`,
          price: 19.99 + i * 10,
          averageScore: 4.5 + (i % 5) * 0.1,
          salesCount: (i + 1) * 10000,
          requirements: { OS: "Windows 10", CPU: "Intel i5" },
          urls: { link: `http://game${i + 1}.com` },
          reportCount: 0,
        },
      });
    })
  );
  console.log('Juegos creados:', juegos);
  return juegos;
}

// Insertar categorías
async function seedCategorias() {
  const categorias = await Promise.all(
    Array.from({ length: 5 }, (_, i) => {
      return prisma.category.create({
        data: {
          name: `Categoría ${i + 1}`,
          description: `Descripción de categoría ${i + 1}`,
        },
      });
    })
  );
  console.log('Categorías creadas:', categorias);
  return categorias;
}

// Insertar plataformas
async function seedPlataformas() {
  const plataformas = await Promise.all(
    Array.from({ length: 5 }, (_, i) => {
      return prisma.platform.create({
        data: {
          name: `Plataforma ${i + 1}`,
          manufacturer: `Fabricante ${i + 1}`,
        },
      });
    })
  );
  console.log('Plataformas creadas:', plataformas);
  return plataformas;
}

// Insertar contenidos
async function seedContenidos(usuarios, juegos) {
  const contenidos = await Promise.all(
    Array.from({ length: 10 }, (_, i) => {
      return prisma.content.create({
        data: {
          gameId: juegos[i % juegos.length].id,
          userId: usuarios[i % usuarios.length].id,
          type: 'RESEÑA',
          title: `Reseña de Juego ${i + 1}`,
          text: `Texto de reseña para el juego ${i + 1}`,
          score: 4,
        },
      });
    })
  );
  console.log('Contenidos creados:', contenidos);
  return contenidos;
}

// Insertar comentarios
async function seedComentarios(usuarios, juegos, contenidos) {
  const comentarios = await Promise.all(
    Array.from({ length: 10 }, (_, i) => {
      return prisma.comment.create({
        data: {
          userId: usuarios[i % usuarios.length].id,
          gameId: juegos[i % juegos.length].id,
          contentId: contenidos[i % contenidos.length]?.id || null,
          text: `Comentario sobre el juego ${i + 1}`,
          score: 5,
        },
      });
    })
  );
  console.log('Comentarios creados:', comentarios);
  return comentarios;
}

// Insertar relaciones de juegos con categorías
async function seedJuegosCategorias(juegos, categorias) {
  const juegoCategoria = await Promise.all(
    juegos.map((juego, i) => {
      return prisma.game.update({
        where: { id: juego.id },
        data: {
          categories: {
            connect: [{ id: categorias[i % categorias.length].id }],
          },
        },
      });
    })
  );
  console.log('Relaciones entre juegos y categorías creadas');
  return juegoCategoria;
}

// Insertar relaciones de juegos con plataformas
async function seedJuegosPlataformas(juegos, plataformas) {
  const juegoPlataforma = await Promise.all(
    juegos.map((juego, i) => {
      return prisma.game.update({
        where: { id: juego.id },
        data: {
          platforms: {
            connect: [{ id: plataformas[i % plataformas.length].id }],
          },
        },
      });
    })
  );
  console.log('Relaciones entre juegos y plataformas creadas');
  return juegoPlataforma;
}

// Insertar juegos favoritos de usuarios
async function seedJuegosFavoritos(usuarios, juegos) {
  const favoritos = await Promise.all(
    usuarios.map((usuario, i) => {
      return prisma.user.update({
        where: { id: usuario.id },
        data: {
          favoriteGames: {
            connect: [{ id: juegos[i % juegos.length].id }],
          },
        },
      });
    })
  );
  console.log('Juegos favoritos de usuarios creados');
  return favoritos;
}

// Ejecutar todas las funciones
async function main() {
  const usuarios = await seedUsuarios();
  const juegos = await seedJuegos();
  const categorias = await seedCategorias();
  const plataformas = await seedPlataformas();
  const contenidos = await seedContenidos(usuarios, juegos);
  const comentarios = await seedComentarios(usuarios, juegos, contenidos);
  await seedJuegosCategorias(juegos, categorias);
  await seedJuegosPlataformas(juegos, plataformas);
  await seedJuegosFavoritos(usuarios, juegos);
  
  console.log('Todos los datos de prueba insertados con éxito');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
