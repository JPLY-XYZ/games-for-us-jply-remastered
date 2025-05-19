import  Juego from '@/components/juego';
import { getGameById } from '@/lib/data'; // Importa tu función para obtener el juego
import { Cable } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function page({ params }) {
   
  const { id } = await params

  if (isNaN(Number(id))) {
  return (
    <div>
      <Cable className="w-36 h-36 animate-bounce mx-auto" />
      <h1 className="text-6xl mb-4">Juego no encontrado</h1>
      <Link href="/">Volver Atras</Link>
    </div>
  );
}
    const game = await getGameById(+id);

    if (!game) {
        return <div><Cable className="w-36 h-36 animate-bounce  mx-auto"/><h1 className='text-6xl mb-4'>Juego no encontrado</h1>
            <Link href="/">Volver Atras</Link ></div>;
    }

    return <Juego game={game} />
    
    
}
