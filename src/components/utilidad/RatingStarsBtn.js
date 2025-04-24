'use client'
import { Star } from 'lucide-react';
import React, { useState } from 'react';



// Componente para mostrar las estrellas
const RatingStarsBtn = ({ score = 0, onRate = () => {}, className }) => {
  const [rating, setRating] = useState(score);

  // Función para manejar el clic en una estrella y cambiar la puntuación
  const handleClick = (index) => {
    setRating(index + 1); // La puntuación se ajusta al índice + 1 (de 1 a 5)
    onRate(index + 1); // Llamamos a la función onRate que pasa la puntuación al componente padre
  };


  return (
    <div className={className}>

      {[...Array(5)].map((_, index) => {
        const filled = rating > index;  // Si la puntuación es mayor que el índice, la estrella se llena
        return (
          <Star
            key={index}
            className={`w-5 h-5 ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleClick(index)} // Llamamos a handleClick cuando se hace clic
          />
        );
      })}
    </div>
  );
};

export default RatingStarsBtn;
