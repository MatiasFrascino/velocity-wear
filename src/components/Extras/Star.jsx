import React from 'react';

const Star = ({ starsNumber }) => {
  
  const generateStars = () => {
    const stars = [];

    for (let i = 0; i < starsNumber; i++) {
      stars.push(<img key={i} className='starImg' src="/src/assets/star.png" alt={`Star ${i + 1}`} />);
    }
    return stars;
  };

  return (
    <>
      {generateStars()}
    </>
  );
};

export default Star;