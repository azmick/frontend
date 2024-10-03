import React, { useState } from 'react';
import { Layout, Button, Upload, Select, Row, Col, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Content } = Layout;

function Questions() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const lessons = ['Matematik', 'Fizik'];
  const topics = {
    Matematik: ['Trigonometri', 'Cebir', 'Geometri'],
    Fizik: ['Kuvvet', 'Hareket', 'Enerji'],
  };

  const handleLessonChange = (value) => {
    setSelectedLesson(value);
    setSelectedTopic(null); // Konu seçiminde ders değiştiğinde sıfırlama
  };

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
  };

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setUploadedImages([...uploadedImages, URL.createObjectURL(file)]);
    }, 1000);
  };

  return (
    <Content style={{ padding: '20px', minHeight: '100vh' }}>
      <Row
        gutter={[16, 16]}
        justify="center"
        align="middle"
        style={{ marginBottom: '20px' }}
      >
        <Col xs={24} md={8}>
          <Select
            placeholder="Ders Seçiniz"
            onChange={handleLessonChange}
            style={{ width: '100%' }}
            value={selectedLesson}
          >
            {lessons.map((lesson) => (
              <Option key={lesson} value={lesson}>
                {lesson}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={8}>
          <Select
            placeholder="Konu Seçiniz"
            onChange={handleTopicChange}
            style={{ width: '100%' }}
            value={selectedTopic}
            disabled={!selectedLesson}
          >
            {selectedLesson &&
              topics[selectedLesson].map((topic) => (
                <Option key={topic} value={topic}>
                  {topic}
                </Option>
              ))}
          </Select>
        </Col>

        <Col xs={24} md={2}>
          <Upload
            customRequest={handleUpload}
            showUploadList={false}
            disabled={!selectedLesson || !selectedTopic}
          >
            <Button
              icon={<UploadOutlined />}
              type="primary"
              style={{
                backgroundColor: !selectedLesson || !selectedTopic ? '#d9d9d9' : '#1890ff',
                color: !selectedLesson || !selectedTopic ? '#8c8c8c' : '#fff',
              }}
              disabled={!selectedLesson || !selectedTopic}
            >
              Resim Ekle
            </Button>
          </Upload>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {uploadedImages.length > 0 && (
          <Col span={24}>
            <h3>Yüklenmiş Resimler:</h3>
          </Col>
        )}

        {uploadedImages.map((image, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              hoverable
              cover={<img alt={`uploaded-${index}`} src={image} style={{ width: '100%' }} />}
            />
          </Col>
        ))}
      </Row>
    </Content>
  );
}

export default Questions;
