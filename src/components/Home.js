import React, { useState } from 'react';
import { Typography, Card, Form, Input, Button, message } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { Title, Text } = Typography;
const { Meta } = Card;

function Home() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const onFinish = (values) => {
    setLoading(true);
    // Simulate a server request
    setTimeout(() => {
      message.success('Mesajınız başarıyla gönderildi!');
      form.resetFields();
      setLoading(false);
    }, 1000);
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
              style={{ textAlign: 'center', color: 'white', margin: '10px' }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ fontSize: '50px', marginBottom: '10px' }}>{card.icon}</div>
              <Meta title={card.title} description={card.description} style={{ color: 'white' }} />
            </Card>
          </div>
        ))}
      </Slider>

      {/* İletişim Formu */}
      {/* <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '60px',marginBottom:'40px', borderRadius:'0.5%' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
          <Title level={3} style={{ color: 'black' }}>Bize Ulaşın</Title>
          <Text style={{ color: 'white' }}>Sorularınızı veya geri bildirimlerinizi buradan iletebilirsiniz.</Text>
        </div>

        <Form
          form={form}
          name="contact"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: '600px', margin: '0 auto', color: 'white' }}
        >
          <Form.Item
            name="name"
            label="Adınız"
            rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
          >
            <Input placeholder="Adınız" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-posta"
            rules={[
              { required: true, message: 'Lütfen e-posta adresinizi giriniz!' },
              { type: 'email', message: 'Lütfen geçerli bir e-posta adresi giriniz!' },
            ]}
          >
            <Input placeholder="E-posta adresiniz" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Mesajınız"
            rules={[{ required: true, message: 'Lütfen mesajınızı giriniz!' }]}
          >
            <Input.TextArea rows={4} placeholder="Mesajınız" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Gönder
            </Button>
          </Form.Item>
        </Form>
      </div> */}
    </div>
  );
}

export default Home;
