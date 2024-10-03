import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import Home from './Home';
import Questions from './Questions';
import Categories from './Categories';
import Contact from './Contact';

const { Header, Content } = Layout;

function Template({ logout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('home'); // Varsayılan olarak anasayfa
  const navigate = useNavigate();

  const handleMenuClick = (section) => {
    setSelectedSection(section); // İçeriği değiştirmek için
    if (isMobile) setIsDrawerOpen(false); // Mobilde drawer'ı kapat
  };

  const updateMenuDisplay = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  window.addEventListener('resize', updateMenuDisplay);

  const renderContent = () => {
    switch (selectedSection) {
      case 'home':
        return <Home />;
      case 'questions':
        return <Questions />;
      case 'categories':
        return <Categories />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="QuestMap Logo"
            style={{ width: '80px', height: '80px', marginRight: '5px' }}
          />
          <h1 style={{ color: 'white', margin: 0 }}>QuestMap</h1>
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
              <Menu mode="vertical" onClick={() => handleMenuClick('home')}>
                <Menu.Item key="1" onClick={() => handleMenuClick('home')}>Anasayfa</Menu.Item>
                <Menu.Item key="2" onClick={() => handleMenuClick('categories')}>Kategoriler</Menu.Item>
                <Menu.Item key="3" onClick={() => handleMenuClick('questions')}>Sorular</Menu.Item>
                <Menu.Item key="4" onClick={() => handleMenuClick('contact')}>İletişim</Menu.Item>
              </Menu>
              <Button type="primary" block onClick={logout} style={{ marginTop: '10px' }}>
                Çıkış Yap
              </Button>
            </Drawer>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={() => handleMenuClick('home')}>Anasayfa</Menu.Item>
              <Menu.Item key="2" onClick={() => handleMenuClick('categories')}>Kategoriler</Menu.Item>
              <Menu.Item key="3" onClick={() => handleMenuClick('questions')}>Sorular</Menu.Item>
              <Menu.Item key="4" onClick={() => handleMenuClick('contact')}>İletişim</Menu.Item>
            </Menu>
            <Button type="primary" onClick={logout} style={{ marginLeft: '20px' }}>
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
        {renderContent()}
      </Content>
    </Layout>
  );
}

export default Template;
