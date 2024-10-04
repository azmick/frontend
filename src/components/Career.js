import React, { useState } from 'react';
import { Tabs, Button, Radio, message } from 'antd';

const { TabPane } = Tabs;

const questions = [
  {
    id: 'soru1',
    question: 'Yeni insanlarla tanışmaktan keyif alırım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru2',
    question: 'Sosyal etkinliklerde merkezde olmayı severim.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru3',
    question: 'İnsanlarla kolayca iletişim kurarım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru4',
    question: 'Yalnız kalmak yerine sosyal ortamlarda bulunmayı tercih ederim.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru5',
    question: 'Başkalarına yardım etmek için gönüllü olurum.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru6',
    question: 'Çatışmalardan kaçınırım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru7',
    question: 'Başkalarının ihtiyaçlarını her zaman kendi ihtiyaçlarımdan önce tutarım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru8',
    question: 'Görevlerimi zamanında tamamlarım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru9',
    question: 'İşlerimi planlayarak yaparım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru10',
    question: 'Detaylara dikkat ederim.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru11',
    question: 'Sorumluluklarımı ihmal etmem.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru12',
    question: 'Stresli durumlarla başa çıkabilirim.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru13',
    question: 'Zor zamanlarda sakin kalabilirim.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru14',
    question: 'Kendimi sıkça kötü hissederim.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru15',
    question: 'Duygusal zorluklar ve dalgalanmalarla başa çıkabilirim.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru16',
    question: 'Yeni fikirleri ve kavramları keşfetmekten hoşlanırım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru17',
    question: 'Sanatsal etkinliklere ilgi duyarım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru18',
    question: 'Yeni deneyimlere açığım.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
  {
    id: 'soru19',
    question: 'Geleneksel yöntemlere bağlı kalmam, yenilikçi düşüncelere değer veririm.',
    answers: [
      'Kesinlikle Katılmıyorum',
      'Katılmıyorum',
      'Kararsızım',
      'Katılıyorum',
      'Kesinlikle Katılıyorum',
    ],
  },
];

function Career() {
  const [activeTab, setActiveTab] = useState('1');  // Başlangıçta "Test" sekmesi açık
  const [testCompleted, setTestCompleted] = useState(false);  // Testin tamamlanıp tamamlanmadığını kontrol ediyoruz
  const [answers, setAnswers] = useState({});  // Kullanıcının verdiği cevapları takip ediyoruz

  // Cevap seçildiğinde güncelleme
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Testi gönderdiğinde sonuç sekmesine yönlendirme
  const handleSubmitTest = () => {
    if (Object.keys(answers).length < questions.length) {
      message.error('Lütfen tüm soruları cevaplayın!');
    } else {
      setTestCompleted(true);  // Test tamamlandı
      setActiveTab('2');  // Sonuç sekmesine geçiş
    }
  };

  return (
    <div style={{ padding: '20px', background: 'white', borderRadius: '10px', minHeight: '300px', marginTop: '50px', marginBottom:'30px' }}>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* Test sekmesi */}
        <TabPane tab="Test" key="1" disabled={testCompleted}>
          {questions.map((question) => (
            <div key={question.id} style={{ marginBottom: '20px' }}>
              <h4>{question.question}</h4>
              <Radio.Group
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                value={answers[question.id]}
              >
                {question.answers.map((answer, index) => (
                  <Radio key={index} value={index + 1}>
                    {answer}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          ))}

          <div style={{ marginTop: '20px' }}>
            <Button type="primary" onClick={handleSubmitTest}>
              Testi Gönder
            </Button>
          </div>
        </TabPane>

        {/* Sonuç sekmesi */}
        <TabPane tab="Sonuç" key="2">
          {testCompleted ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              minHeight: '200px',
              textAlign: 'center',
            }}>
              <h1>İşte cevaplarınıza göre size en uygun 3 meslek</h1>
              <p>1. Yazılım Mühendisi</p>
              <p>2. Veri Bilimci</p>
              <p>3. Proje Yöneticisi</p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h3>Henüz test sonuçları mevcut değil. Lütfen testi tamamlayın.</h3>
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Career;
