import React, { useState } from 'react';
import { Button, Form, Input, Typography, Row, Col } from 'antd'; // Ant Design bileşenleri
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const { Title, Text } = Typography;

function Login({ setToken }) {
  const [loading, setLoading] = useState(false); // Buton yükleniyor durumu için
  const navigate = useNavigate(); // Yönlendirme için kullanıyoruz

  const onFinish = async (values) => {
    setLoading(true); // Yüklenme durumunu başlat
    const { email, password } = values;
    const token = await authService.login(email, password);
    if (token) {
      setToken(token);
      navigate('/'); // Başarılı girişte home sayfasına yönlendir
    }
    setLoading(false); // Yüklenme durumunu bitir
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Title level={2} style={{ textAlign: 'center' }}>QuestMap Login Page</Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            Üye değil misiniz?{' '}
            <Link to="/register" style={{ color: '#1890ff' }}>Üye Olun</Link>
          </Text>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
