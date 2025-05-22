'use client'
import { Star } from 'lucide-react';
import React, { useState } from 'react';


const RatingStarsButton= ({ score = 0, onRate = () => {}, className }) => {
  const [rating, setRating] = useState(score);

  const handleClick = (index) => {
    setRating(index + 1); 
    onRate(index + 1); 
  };


  return (
    <div className={className}>

      {[...Array(5)].map((_, index) => {
        const filled = rating > index;  
        return (
          <Star
            key={index}
            className={`w-5 h-5 ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleClick(index)} 
          />
        );
      })}
    </div>
  );
};

export default RatingStarsButton;
