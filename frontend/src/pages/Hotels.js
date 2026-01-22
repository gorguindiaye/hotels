import React from 'react';
import MainLayout from '../components/MainLayout';
import HotelCard from '../components/HotelCard';
import '../styles/Hotels.css';

const Hotels = () => {
  const hotels = [
    {
      id: 1,
      name: 'Hôtel Terrou-Bi',
      address: 'Dakar, Sénégal',
      price: '25.000',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?w=500&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'King Fahd Palace',
      address: 'Dakar, Sénégal',
      price: '20.000',
      image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?w=500&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Radisson Blu Hotel',
      address: 'Dakar, Sénégal',
      price: '22.000',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Ngor Diarama Hotel',
      address: 'Dakar, Sénégal',
      price: '18.000',
      image: 'https://images.pexels.com/photos/3971818/pexels-photo-3971818.jpeg?w=500&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Pullman Dakar',
      address: 'Dakar, Sénégal',
      price: '24.000',
      image: 'https://images.unsplash.com/photo-1559205615-cd4628902d4a?w=500&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Hilton Dakar',
      address: 'Dakar, Sénégal',
      price: '26.000',
      image: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?w=500&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'Sun Beach Hotel',
      address: 'Dakar, Sénégal',
      price: '19.000',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?w=500&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'Atlantic Palace',
      address: 'Dakar, Sénégal',
      price: '23.000',
      image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?w=500&h=400&fit=crop'
    }
  ];

  return (
    <MainLayout>
      <div className="hotels-page">
        <div className="hotels-header">
          <div className="header-text">
            <h1 className="hotels-title">
              Hôtels <span className="hotel-count">{hotels.length}</span>
            </h1>
          </div>
        </div>

        <section className="hotels-section">
          <div className="hotels-grid">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                name={hotel.name}
                address={hotel.address}
                price={hotel.price}
                image={hotel.image}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Hotels;
