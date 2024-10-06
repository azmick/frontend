import React, { useState, useEffect } from 'react';
import { Layout, Button, Upload, Select, Row, Col, Card, Input, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Content } = Layout;

function Questions() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDescription, setNewDescription] = useState('');

  const lessons = ['Matematik', 'Fizik'];
  const topics = {
    Matematik: ['Trigonometri', 'Cebir', 'Geometri'],
    Fizik: ['Kuvvet', 'Hareket', 'Enerji'],
  };

  // Soruları fetch etme fonksiyonu
  const fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      message.error('Giriş yapmanız gerekiyor!');
      return;
    }

    if (selectedLesson && selectedTopic) {
      const response = await fetch(`http://localhost:5000/auth/questions/${userId}?lesson=${selectedLesson}&topic=${selectedTopic}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Token gönderiliyor
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        message.error('Soruları alırken bir hata oluştu.');
      }
    }
  };

  // Ders ve Konu seçildiğinde soruları fetch et
  useEffect(() => {
    fetchQuestions();
  }, [selectedLesson, selectedTopic]);

  const handleLessonChange = (value) => {
    setSelectedLesson(value);
    setSelectedTopic(null); // Konu sıfırlanır
  };

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
  };

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);  // Resim dosyasını ekliyoruz.
    
    // Ders ve konuyu formData'ya ekliyoruz.
    formData.append("lesson", selectedLesson); 
    formData.append("topic", selectedTopic);
  
    const token = localStorage.getItem('token');  // JWT Token'ı localStorage'dan al
  
    const response = await fetch('http://localhost:5000/auth/upload-question', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`  // Token'ı 'Authorization' başlığına ekle
      },
      body: formData,  // FormData ile gönderiyoruz
    });
  
    if (response.ok) {
      message.success('Resim başarıyla yüklendi');
      // Yükleme sonrası soruları tekrar fetch et
      fetchQuestions();
    } else {
      message.error('Resim yükleme hatası: ' + response.statusText);
    }
  };
  

  // Soruları düzenleme modalı açma
  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewDescription(question.description);
    setIsModalVisible(true);
  };

  // Soruyu güncelleme
  const handleUpdateQuestion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Giriş yapmanız gerekiyor!');
      return;
    }

    await fetch(`http://localhost:5000/auth/questions/${editingQuestion.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ description: newDescription, lesson: selectedLesson, topic: selectedTopic }),
    });

    setQuestions((prev) =>
      prev.map((q) => (q.id === editingQuestion.id ? { ...q, description: newDescription } : q))
    );
    setIsModalVisible(false);
  };

  // Soruyu silme işlemi
  const handleDeleteQuestion = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Giriş yapmanız gerekiyor!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/questions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
        message.success('Soru başarıyla silindi.');
      } else {
        message.error('Soru silinirken bir hata oluştu.');
      }
    } catch (error) {
      message.error('Soru silinirken bir hata oluştu.');
    }
  };

  return (
    <Content style={{ padding: '20px', minHeight: '100vh' }}>
      <Row gutter={[16, 16]} justify="center" align="middle" style={{ marginBottom: '20px' }}>
        <Col xs={24} md={8}>
          <Select placeholder="Ders Seçiniz" onChange={handleLessonChange} style={{ width: '100%' }} value={selectedLesson}>
            {lessons.map((lesson) => (
              <Option key={lesson} value={lesson}>
                {lesson}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={8}>
          <Select placeholder="Konu Seçiniz" onChange={handleTopicChange} style={{ width: '100%' }} value={selectedTopic} disabled={!selectedLesson}>
            {selectedLesson &&
              topics[selectedLesson].map((topic) => (
                <Option key={topic} value={topic}>
                  {topic}
                </Option>
              ))}
          </Select>
        </Col>

        <Col xs={24} md={2}>
          <Upload customRequest={handleUpload} showUploadList={false} disabled={!selectedLesson || !selectedTopic}>
            <Button icon={<UploadOutlined />} type="primary">
              Resim Ekle
            </Button>
          </Upload>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {questions.length > 0 ? questions.map((question) => (
          <Col xs={24} md={8} key={question.id}>
            <Card
              hoverable
              cover={question.images && question.images.length > 0 ? (
                <img
                  src={`http://localhost:5000/uploads/${question.images[0]}`}
                  alt={`uploaded-${question.id}`}
                  style={{ width: '100%' }}
                />
              ) : (
                <div>Resim bulunamadı</div>
              )}
              actions={[
                <Button onClick={() => handleEditQuestion(question)}>Düzenle</Button>,
                <Button onClick={() => handleDeleteQuestion(question.id)}>Sil</Button>,
              ]}
            >
              <p>{question.description}</p>
            </Card>
          </Col>
        )) : <div>Soru bulunamadı.</div>}
      </Row>

      <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleUpdateQuestion}>
        <Input.TextArea rows={4} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      </Modal>
    </Content>
  );
}

export default Questions;
