import { AlertTriangle, Heart, Youtube, Gamepad2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full overflow-y-auto p-8 space-y-16">
      {/* NUEVOS LANZAMIENTOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Nuevos Lanzamientos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              titulo: "Starfield: El RPG espacial",
              descripcion: "Explora el universo y descubre mundos infinitos.",
              img: "https://placehold.co/640x360.jpg",
              creador: "Bethesda",
              precio: "69,99€",
              plataforma: "PC / Xbox",
              favorito: true
            },
            {
              titulo: "Hogwarts Legacy",
              descripcion: "Sumérgete en el mundo de Harry Potter con este juego de acción.",
              img: "https://placehold.co/640x360.jpg",
              creador: "Portkey Games",
              precio: "59,99€",
              plataforma: "PC / PS5 / Xbox",
              favorito: false
            },
            {
              titulo: "Final Fantasy XVI",
              descripcion: "La saga de Final Fantasy regresa con combates más dinámicos.",
              img: "https://placehold.co/640x360.jpg",
              creador: "Square Enix",
              precio: "69,99€",
              plataforma: "PS5",
              favorito: true
            }
          ].map((juego, idx) => (
            <div key={idx} className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <div className="absolute z-10 top-4 right-4 flex gap-2">
              <Star className={`cursor-pointer ${juego.favorito ? "text-yellow-400" : "text-gray-400"}`} />
               <AlertTriangle className="text-yellow-500 hover:text-yellow-600 cursor-pointer" />
              
              </div>
              <div className="relative w-full h-56 mb-4">
                <Image
                  src={juego.img}
                  alt={juego.titulo}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{juego.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400">{juego.descripcion}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Creador: {juego.creador}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Plataforma: {juego.plataforma}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Precio: {juego.precio}</p>
              <Link href="#" className="text-blue-500 font-semibold hover:text-blue-600 transition">
                Leer más
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* NOTICIAS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Noticias Relevantes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              titulo: "Actualización en Call of Duty",
              descripcion: "Nuevos mapas y modos de juego.",
              img: "https://placehold.co/640x360.jpg",
              creador: "Activision",
              juegoRelacionado: "Call of Duty",
              likes: 120
            },
            {
              titulo: "Sony revela su nuevo PSVR",
              descripcion: "Una experiencia VR más inmersiva.",
              video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              creador: "Sony",
              juegoRelacionado: "PlayStation VR",
              likes: 230
            },
            {
              titulo: "Rumores sobre Nintendo Switch 2",
              descripcion: "Podría superar a su predecesora.",
              img: "https://placehold.co/640x360.jpg",
              creador: "Nintendo",
              juegoRelacionado: "Nintendo Switch",
              likes: 180
            }
          ].map((noticia, idx) => (
            <div key={idx} className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <div className="absolute z-10 top-4 right-4">
                <AlertTriangle className="text-yellow-500 hover:text-yellow-600 cursor-pointer" />
              </div>
              {noticia.video ? (
                <div className="w-full mb-4">
                  <iframe
                    src={noticia.video}
                    width="100%"
                    height="315"
                    className="rounded-2xl"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative w-full h-[315px] mb-4">
                  <Image
                    src={noticia.img}
                    alt={noticia.titulo}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{noticia.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400">{noticia.descripcion}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Creador: {noticia.creador}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Juego relacionado: {noticia.juegoRelacionado}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Likes: {noticia.likes}</p>
              <Link href="#" className="text-blue-500 font-semibold hover:text-blue-600 transition">
                Leer más
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENIDOS */}
      <section>
        <h2 className="text-4xl font-semibold text-white mb-8">Últimos Contenidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              titulo: "Guía: Cómo dominar en Apex Legends",
              video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              creador: "Juan Gamer",
              juegoRelacionado: "Apex Legends",
              likes: 98
            },
            {
              titulo: "Reseña: El regreso de Zelda",
              img: "https://placehold.co/640x360.jpg",
              creador: "Ana Reviews",
              juegoRelacionado: "Zelda: Tears of the Kingdom",
              likes: 145
            },
            {
              titulo: "Trucos para mejorar en FIFA 23",
              img: "https://placehold.co/640x360.jpg",
              creador: "ProFIFA",
              juegoRelacionado: "FIFA 23",
              likes: 76
            }
          ].map((contenido, idx) => (
            <div key={idx} className="relative bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <div className="absolute z-10 top-4 right-4 flex gap-2">
                {contenido.video ? <Youtube className="text-red-500" /> : <Gamepad2 className="text-green-500" />}
                <AlertTriangle className="text-yellow-500 hover:text-yellow-600 cursor-pointer" />
              </div>
              {contenido.video ? (
                <div className="w-full mb-4">
                  <iframe
                    src={contenido.video}
                    width="100%"
                    height="315"
                    className="rounded-2xl"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative w-full h-[315px] mb-4">
                  <Image
                    src={contenido.img}
                    alt={contenido.titulo}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{contenido.titulo}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">Creador: {contenido.creador}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Juego relacionado: {contenido.juegoRelacionado}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Likes: {contenido.likes}</p>
              <Link href="#" className="text-blue-500 font-semibold hover:text-blue-600 transition">
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
