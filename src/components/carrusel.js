'use client'
import { useState } from 'react';

function ClienteCarrusel({ screenshots }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Función para pasar a la imagen siguiente
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    };

    // Función para retroceder a la imagen anterior
    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length
        );
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-all duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {screenshots.map((screenshot, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <img
                                src={screenshot}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-[300px] object-cover rounded-lg shadow-xl"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Flechas de navegación */}
            <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
                &#10094;
            </button>
            <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
                &#10095;
            </button>

            {/* Indicadores de página */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
                {screenshots.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ClienteCarrusel;
