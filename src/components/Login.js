import React, { useState } from 'react';
import { Button, Form, Input, Typography, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const { Title, Text } = Typography;

function Login({ setToken, setEmail }) {  // setEmail prop'unu da alıyoruz
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;  // Kullanıcı email ve şifreyi alıyoruz
    const token = await authService.login(email, password);
    if (token) {
      setToken(token);
      setEmail(email);  // Kullanıcının email'ini set ediyoruz
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);  // Email'i de localStorage'da saklıyoruz
      navigate('/');
    }
    setLoading(false);
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
