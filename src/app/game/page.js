import  Juego from '@/components/juego';
import { getGameById } from '@/lib/data'; // Importa tu función para obtener el juego
import { Suspense } from 'react';

export default async function page({ searchParams }) {
    const gameid = searchParams.gameid;
    const game = await getGameById(+gameid);

    return (
        <Suspense fallback={"hola esto esta cargando"}>
        <Juego game={game} />
    </Suspense>
    );
    
}
