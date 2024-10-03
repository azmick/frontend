import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Drawer, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import {jwtDecode } from 'jwt-decode';
import authService from '../services/authService';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

function Home({ token, logout }) {
  const [nickname, setNickname] = useState('Kullanıcı');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        authService.getUsernameByEmail(decodedToken.email).then((username) => {
          if (username) {
            setNickname(username);
          }
        });
      } catch (error) {
        console.error('Invalid token: ', error.message);
      }
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const updateMenuDisplay = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    updateMenuDisplay();
    window.addEventListener('resize', updateMenuDisplay);
    return () => {
      window.removeEventListener('resize', updateMenuDisplay);
    };
  }, []);

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
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/path/to/logo.png"
            alt="QuestMap Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            QuestMap
          </Title>
        </div>

        {isMobile ? (
          <>
            <Button type="primary" icon={<MenuOutlined />} onClick={() => setIsDrawerOpen(true)} />
            <Drawer
              title="Menü"
              placement="top"
              onClose={() => setIsDrawerOpen(false)}
              open={isDrawerOpen}
            >
              <Menu mode="vertical" onClick={() => setIsDrawerOpen(false)}>
                <Menu.Item key="1">Anasayfa</Menu.Item>
                <Menu.Item key="2">Kategoriler</Menu.Item>
                <Menu.Item key="3">Sorular</Menu.Item>
                <Menu.Item key="4">İletişim</Menu.Item>
              </Menu>
              <Button type="primary" block onClick={handleLogout} style={{ marginTop: '10px' }}>
                Çıkış Yap
              </Button>
            </Drawer>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ borderBottom: 'none' }}>
              <Menu.Item key="1">Anasayfa</Menu.Item>
              <Menu.Item key="2">Kategoriler</Menu.Item>
              <Menu.Item key="3">Sorular</Menu.Item>
              <Menu.Item key="4">İletişim</Menu.Item>
            </Menu>
            <Button type="primary" onClick={handleLogout} style={{ marginLeft: '20px' }}>
              Çıkış Yap
            </Button>
          </div>
        )}
      </Header>

      <Content
        style={{
          padding: '0 50px',
          marginTop: '0px',
          minHeight: '100vh',
          backgroundImage: `url('/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Title level={5} style={{ color: 'yellow' }}>MERHABA ÖĞRENCİLER</Title>
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
      </Content>
    </Layout>
  );
}

export default Home;
