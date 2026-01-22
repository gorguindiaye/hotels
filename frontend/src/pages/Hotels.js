import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import { hotelsAPI } from '../utils/hotelsAPI';
import '../styles/Hotels.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await hotelsAPI.getHotels();
      const hotelsData = Array.isArray(response.data) ? response.data : response.data.results || [];
      
      // Mapper les données du backend au format attendu
      const formattedHotels = hotelsData.map((hotel) => ({
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        price: hotel.price_per_night,
        image: hotel.image || 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?w=500&h=400&fit=crop',
        description: hotel.description,
        star_rating: hotel.star_rating
      }));
      
      setHotels(formattedHotels);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des hôtels:', err);
      setError('Impossible de charger les hôtels');
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotels-page">
      <div className="hotels-header">
        <div className="header-text">
          <h1 className="hotels-title">
            Hôtels <span className="hotel-count">{hotels.length}</span>
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement des hôtels...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : hotels.length === 0 ? (
        <div className="no-hotels">Aucun hôtel disponible</div>
      ) : (
        <section className="hotels-section">
          <div className="hotels-grid">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                name={hotel.name}
                address={hotel.address}
                price={hotel.price}
                image={hotel.image}
                rating={hotel.star_rating}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Hotels;
