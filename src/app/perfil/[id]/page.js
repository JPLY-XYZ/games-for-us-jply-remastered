    import { auth } from '@/auth';

    import EditImagePerfil from '@/components/perfil/edit-image-perfil';
    import EditImageFondo from '@/components/perfil/edit-imagen-fondo';

    import EditUserInfoForm from '@/components/perfil/edit-user-info-form';
    import ButtonReportConfig from '@/components/utilidad/button-report-config';
    import { getUserById, isOwner } from '@/lib/data';
    import { Cable } from 'lucide-react';
    import Link from 'next/link';
    import { Suspense } from 'react';


    export default async function PerfilUsuario({ params }) {
    const session = await auth();
    const { id } = await params;
    let ownership = false;

    if (session && session.user) {
        ownership = await isOwner(session.user.id, id, "USER");
    }

    const user = await getUserById(id);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <Cable className="w-36 h-36 animate-bounce mx-auto" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">Usuario no encontrado</h1>
                <Link href="/" className="text-blue-500 underline">Volver Atrás</Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen w-full md:w-[70%] sm:w-[80%] px-4 pb-30">
            <div className="h-56 w-full bg-gray-800 relative z-0">
                <div className="relative h-full">
                    <EditImageFondo user={user} ownership={ownership} />
                    <div className="absolute top-2 right-2 z-10">
                        <ButtonReportConfig id={user.id} tipo="USER" session={session} />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0 text-center md:text-left">
                    <EditImagePerfil ownership={ownership} user={user} />
                    {user.role === "DESARROLLADOR" && (
                        <p className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full inline-block">DESARROLLADOR</p>
                    )}
                    {user.role === "ADMINISTRADOR" && (
                        <p className="mt-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full inline-block">MODERADOR</p>
                    )}
                </div>
                <div className="w-full">
                    <EditUserInfoForm ownership={ownership} user={user} />
                </div>
            </div>

           <div className="max-w-6xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div className="p-4 col-span-1">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Contenidos</h2>
        <p className="text-gray-600 dark:text-gray-300">{user._count.contents} publicados</p>
    </div>
    <div className="p-4 col-span-1">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Comentarios</h2>
        <p className="text-gray-600 dark:text-gray-300">{user._count.comments} escritos</p>
    </div>
    <div className="p-4 col-span-2 sm:col-span-2 md:col-span-1">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Favoritos</h2>
        <p className="text-gray-600 dark:text-gray-300">{user.favoriteGames.length} juegos</p>
    </div>
</div>


            <div className="max-w-6xl mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Juegos Favoritos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {user.favoriteGames.slice(0, 9).filter(game => game.visible).map((juego, index) => (
                        <Link href={`/juego/${juego.id}`} key={index} className="bg-white dark:bg-slate-800 rounded shadow overflow-hidden">
                            <img src={juego.urls.images.cover} alt={juego.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{juego.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                {user.favoriteGames.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-300 mt-4">No hay juegos favoritos.</p>
                )}
                <Link href={`/perfil/${user.id}/juegosfavoritos`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Ver todos los juegos favoritos
                </Link>
            </div>

            {user.role === "DESARROLLADOR" && (
                <div className="max-w-6xl mx-auto mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Juegos Publicados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {user.developedGames.slice(0, 9).filter(game => game.visible).map((juego, index) => (
                            <Link href={`/juego/${juego.id}`} key={index} className="bg-white dark:bg-slate-800 rounded shadow overflow-hidden">
                                <img src={juego.urls.images.cover} alt={juego.nombre} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{juego.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {user.developedGames.length === 0 && (
                        <p className="text-gray-600 dark:text-gray-300 mt-4">No hay juegos publicados.</p>
                    )}
                    <Link href={`/perfil/${user.id}/juegospublicados`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Ver todos los juegos publicados
                    </Link>
                </div>
            )}
        </div>
    );
}