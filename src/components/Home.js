import React from 'react';
import { Typography, Card } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { Title, Text } = Typography;
const { Meta } = Card;

function Home() {
  const cardsData = [
    {
      title: 'Coğrafya',
      icon: '🌍',
      description: 'Coğrafya soruları hakkında bilgi edinin.',
    },
    {
      title: 'Felsefe',
      icon: '🧠',
      description: 'Felsefe soruları hakkında bilgi edinin.',
    },
    {
      title: 'Matematik',
      icon: '📐',
      description: 'Matematik soruları hakkında bilgi edinin.',
    },
    {
      title: 'Fizik',
      icon: '🔬',
      description: 'Fizik soruları hakkında bilgi edinin.',
    },
  ];

  // Slider ayarları
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Büyük ekran için 3 kart
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Orta ekran
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Küçük ekran
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <Title level={5} style={{ color: 'white' }}>MERHABA ÖĞRENCİLER</Title>
        <Title level={1} style={{ color: 'white' }}>Soru Biriktirme Platformuna Hoşgeldiniz</Title>
        <Text style={{ color: 'white', fontSize: '16px' }}>
          Burada, karşılaştığınız tüm soruları paylaşabilir ve diğer kullanıcıların deneyimlerinden yararlanarak çözümler bulabilirsiniz.
        </Text>
      </div>

      {/* Slider ile Kartlar */}
      <Slider {...sliderSettings}>
        {cardsData.map((card, index) => (
          <div key={index}>
            <Card
              hoverable
              style={{ textAlign: 'center', backgroundColor: '#f5222d', color: 'white', margin: '10px' }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ fontSize: '50px', marginBottom: '10px' }}>{card.icon}</div>
              <Meta title={card.title} description={card.description} style={{ color: 'white' }} />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Home;
