import React, { useState, useEffect } from 'react';
import { Layout, Button, Upload, Select, Row, Col, Card, Input, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Content } = Layout;

function Questions() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null); // Düzenlemek için seçilen soru
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal için
  const [newDescription, setNewDescription] = useState(''); // Açıklama güncelleme

  const lessons = ['Matematik', 'Fizik'];
  const topics = {
    Matematik: ['Trigonometri', 'Cebir', 'Geometri'],
    Fizik: ['Kuvvet', 'Hareket', 'Enerji'],
  };

  // Kullanıcının sorularını çek
  useEffect(() => {
    const fetchQuestions = async () => {
      const userId = localStorage.getItem('userId'); // Kullanıcının ID'sini al
      const response = await fetch(`http://localhost:5000/auth/questions/${userId}`);
      const data = await response.json();
      setQuestions(data);
    };
  
    fetchQuestions();
  }, []);

  const handleLessonChange = (value) => {
    setSelectedLesson(value);
    setSelectedTopic(null); // Konu seçiminde ders değiştiğinde sıfırlama
  };

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
  };

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);  // Backend'deki 'image' ile eşleşmeli
  
    const token = localStorage.getItem('token');  // JWT Token'ı localStorage'dan al
  
    const response = await fetch('http://localhost:5000/auth/upload-question', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`  // Token'ı 'Authorization' başlığına ekle
      },
      body: formData,  // FormData ile gönderiyoruz
    });
  
    if (response.ok) {
      console.log('Resim başarıyla yüklendi');
    } else {
      console.error('Resim yükleme hatası:', response.statusText);
    }
  };
  
  

  // Düzenleme işlemi için Modal açma
  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewDescription(question.description);
    setIsModalVisible(true);
  };

  // Soru güncelleme
  const handleUpdateQuestion = async () => {
    await fetch(`http://localhost:5000/auth/questions/${editingQuestion.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newDescription, lesson: selectedLesson, topic: selectedTopic }),
    });

    setQuestions((prev) =>
      prev.map((q) => (q.id === editingQuestion.id ? { ...q, description: newDescription } : q))
    );
    setIsModalVisible(false);
  };

  // Soru silme işlemi
  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/auth/questions/${id}`, {
        method: 'DELETE',
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
        {/* Ders ve Konu Seçimi */}
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

        {/* Resim Yükleme */}
        <Col xs={24} md={2}>
          <Upload customRequest={handleUpload} showUploadList={false} disabled={!selectedLesson || !selectedTopic}>
            <Button icon={<UploadOutlined />} type="primary">
              Resim Ekle
            </Button>
          </Upload>
        </Col>
      </Row>

      {/* Yüklenmiş Sorular */}
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {questions.map((question) => (
          <Col xs={24} md={8} key={question.id}>
            <Card
              hoverable
              cover={<img src={`http://localhost:5000/uploads/${question.images[0]}`} alt={`uploaded-${question.id}`} style={{ width: '100%' }} />            }
              actions={[
                <Button onClick={() => handleEditQuestion(question)}>Düzenle</Button>,
                <Button onClick={() => handleDeleteQuestion(question.id)}>Sil</Button>,
              ]}
            >
              <p>{question.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Düzenleme Modal */}
      <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleUpdateQuestion}>
        <Input.TextArea rows={4} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      </Modal>
    </Content>
  );
}

export default Questions;
