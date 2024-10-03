import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Row, Col, Typography, Card, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

function Home({ token, logout }) {
  const [nickname, setNickname] = useState('Kullanıcı');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Ekranın mobil olup olmadığını takip edeceğiz.
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
        console.error("Invalid token: ", error.message);
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
        <Row justify="center" align="middle" style={{ minHeight: '30vh' }}>
          <Col>
            <Title level={5} style={{ textAlign: 'center', color: 'yellow' }}>
              MERHABA ÖĞRENCİLER
            </Title>
            <Title level={1} style={{ textAlign: 'center', color: 'white' }}>
              Soru Biriktirme Platformuna Hoşgeldiniz
            </Title>
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'white', fontSize: '16px' }}>
              Burada, karşılaştığınız tüm soruları paylaşabilir ve diğer kullanıcıların deneyimlerinden yararlanarak çözümler bulabilirsiniz. 
              Herkesin bir şeyler öğrenebileceği ve sorularınıza yanıtlar alabileceğiniz bir topluluk oluşturmayı hedefliyoruz.
            </Text>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center" align="middle" style={{ marginTop: '40px' }}>
          {cardsData.map((card, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                style={{ textAlign: 'center', backgroundColor: '#f5222d', color: 'white' }}
                bodyStyle={{ padding: '20px' }}
              >
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>{card.icon}</div>
                <Meta title={card.title} description={card.description} style={{ color: 'white' }} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}

export default Home;
