import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Modal, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import Home from './Home';
import Questions from './Questions';
import Career from './Career';
import Contact from './Contact';

const { Header, Content } = Layout;

function Template({ email, logout }) {  // email prop'unu aldık
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('home');  // Varsayılan olarak anasayfa
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const navigate = useNavigate();

  // Ekran genişliği değişimini dinleme
  const updateMenuDisplay = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateMenuDisplay);
    return () => window.removeEventListener('resize', updateMenuDisplay);
  }, []);

  // Modal durumunu kontrol eden useEffect
  useEffect(() => {
    if (email) {  // Email varsa localStorage'dan modal durumu kontrol ediliyor
      const dontShow = localStorage.getItem(`dontShowModal_${email}`);
      if (!dontShow) {
        setIsModalVisible(true);
      }
    }
  }, [email]);

  const handleModalOk = () => {
    if (dontShowAgain) {
      localStorage.setItem(`dontShowModal_${email}`, 'true');  // Kullanıcıya özel modal kaydı yapılıyor
    }
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (e) => {
    setDontShowAgain(e.target.checked);
  };

  const handleMenuClick = (section) => {
    setSelectedSection(section);  // İçeriği değiştirmek için
    if (isMobile) setIsDrawerOpen(false);  // Mobilde drawer'ı kapat
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'home':
        return <Home />;
      case 'questions':
        return <Questions />;
      case 'career':
        return <Career />;
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
                <Menu.Item key="2" onClick={() => handleMenuClick('career')}>Kariyer</Menu.Item>
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
              <Menu.Item key="2" onClick={() => handleMenuClick('career')}>Kariyer</Menu.Item>
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

      {/* Modal */}
      <Modal
        title="Kariyer Yolculuğu"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Checkbox key="checkbox" onChange={handleCheckboxChange}>
            Bunu bir daha gösterme
          </Checkbox>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Tamam
          </Button>,
        ]}
      >
        <p>Kariyer yolculuğunda bir adım ileri gitmek istiyorsanız Kariyer sekmesindeki kişilik testi analizini çözmeye davetlisiniz.</p>
      </Modal>
    </Layout>
  );
}

export default Template;
