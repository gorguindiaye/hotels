import React from 'react';
import '../styles/HotelCard.css';

const HotelCard = ({ name, address, price, image }) => {
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
        <p className="hotel-price">{price} XOF par nuit</p>
      </div>
    </div>
  );
};

export default HotelCard;
