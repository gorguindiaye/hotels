import React from 'react';
import '../styles/HotelCard.css';

const HotelCard = ({ name, address, price, image, rating }) => {
  // Formater le prix en XOF avec separateur de milliers
  const formatPrice = (priceValue) => {
    const priceNum = parseInt(priceValue) || 0;
    return priceNum.toLocaleString('fr-FR') + ' XOF par nuit';
  };

  return (
    <div className="hotel-card">
      <div className="hotel-image-container">
        <img
          src={image}
          alt={name}
          className="hotel-image"
        />
      </div>
      <div className="hotel-info">
        <p className="hotel-address">{address}</p>
        <h3 className="hotel-name">{name}</h3>
        <p className="hotel-price">{formatPrice(price)}</p>
      </div>
    </div>
  );
};

export default HotelCard;
