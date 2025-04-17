import Image from "next/image";

function Perfil({ user }) {
    console.log(user);

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen md:w-[60%]">
            {/* Banner */}
            <div className="h-56 w-full bg-gray-800 relative z-0">
                {user.backgroundImage && (
                    <Image
                        src={user.backgroundImage}
                        alt="banner"
                        layout="fill"
                        objectFit="cover"
                        className="brightness-75"
                    />
                )}
            </div>

            {/* Perfil info */}
            <div className="max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="flex-shrink-0">
    {user.image && (
        <Image
            src={user.image}
            alt="profile image"
            width={160}
            height={160}
            className="rounded-full border-4 border-white shadow-lg"
        />
    )}

    {user.role === "DESARROLLADOR" && (
        <p className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full">
            DESARROLLADOR
        </p>
    )}

    {user.role === "ADMINISTRADOR" && (
        <p className="mt-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full">
            MODERADOR
        </p>
    )}
</div>

                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 wrap-anywhere">{user.bio}</p>
                    {user.country && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.country}</p>
                    )}
                </div>
            </div>

            {/* Estadísticas */}
            <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Contenidos</h2>
                    <p className="text-gray-600 dark:text-gray-300">{user._count.contents} publicados</p>
                </div>
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Comentarios</h2>
                    <p className="text-gray-600 dark:text-gray-300">{user._count.comments} escritos</p>
                </div>
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Favoritos</h2>
                    <p className="text-gray-600 dark:text-gray-300">{user.favoriteGames.length} juegos</p>
                </div>
            </div>

            {/* Juegos Favoritos */}
            <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Juegos Favoritos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {user.favoriteGames.map((juego, index) => (
                        <div key={index} className="overflow-hidden bg-white dark:bg-slate-800 rounded shadow">
                            <Image
                                src={juego.imagen}
                                alt={juego.titulo}
                                width={400}
                                height={200}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{juego.titulo}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Juegos Publicados */}
            {user.role == "DESARROLLADOR" &&
            <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Juegos Publicados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {user.developedGames.map((juego, index) => (
                        <div key={index} className="overflow-hidden bg-white dark:bg-slate-800 rounded shadow">
                            <Image
                                src={juego.imagen}
                                alt={juego.titulo}
                                width={400}
                                height={200}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{juego.titulo}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
}
        </div>
    );
}

export default Perfil;
