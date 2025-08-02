import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
  padding: 0 20px;
`;

const Greeting = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const StartBox = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const StartButton = styled.button`
  padding: 15px 25px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  background-color: #556cd6;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4051b5;
  }
`;

const FormSection = styled.div`
  margin-top: 20px;
`;

const QuestionBlock = styled.div`
  margin-bottom: 30px;

  p {
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const OptionGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const Option = styled.button`
  flex: 1 1 40%;
  padding: 10px 15px;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e0ff;
    border-color: #556cd6;
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 15px 40px;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  background-color: #556cd6;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4051b5;
  }
`;

const Survey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.userName || '사용자';

  const [showSurvey, setShowSurvey] = useState(false);

  const [answers, setAnswers] = useState({
    Q1: '',
    Q2: '',
    Q3: '',
    Q4: '',
    Q5: '',
  });

  const handleStart = () => setShowSurvey(true);

  const handleChange = (questionKey, value) => {
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  const handleSubmit = () => {
    console.log('설문 결과:', answers);
    navigate('/homepage');
  };

  return (
    <Container>
      <Greeting>{userName}님, 반갑습니다!</Greeting>

      {!showSurvey ? (
        <StartBox>
          <StartButton onClick={handleStart}>🎯 취저 애니 찾기</StartButton>
        </StartBox>
      ) : (
        <FormSection>
          {/* Q1 */}
          <QuestionBlock>
            <p>1. 어떤 분위기의 애니를 좋아하나요?</p>
            <OptionGroup>
              <Option onClick={() => handleChange('Q1', 'A')}>A. 밝고 유쾌한 분위기</Option>
              <Option onClick={() => handleChange('Q1', 'B')}>B. 감동적이고 따뜻한 분위기</Option>
              <Option onClick={() => handleChange('Q1', 'C')}>C. 어두운, 긴장감 있는 분위기</Option>
              <Option onClick={() => handleChange('Q1', 'D')}>D. 블랙코미디나 독특한 감성</Option>
            </OptionGroup>
          </QuestionBlock>

          {/* Q2 */}
          <QuestionBlock>
            <p>2. 선호하는 장르는 무엇인가요?</p>
            <OptionGroup>
              <Option onClick={() => handleChange('Q2', 'A')}>A. 일상/로맨스</Option>
              <Option onClick={() => handleChange('Q2', 'B')}>B. 액션/모험</Option>
              <Option onClick={() => handleChange('Q2', 'C')}>C. 판타지/이세계</Option>
              <Option onClick={() => handleChange('Q2', 'D')}>D. SF/추리/스릴러</Option>
            </OptionGroup>
          </QuestionBlock>

          {/* Q3 */}
          <QuestionBlock>
            <p>3. 캐릭터 중심 vs. 세계관 중심, 어떤 쪽이 더 끌리나요?</p>
            <OptionGroup>
              <Option onClick={() => handleChange('Q3', 'A')}>A. 캐릭터의 감정선과 성장에 집중되는 이야기</Option>
              <Option onClick={() => handleChange('Q3', 'B')}>B. 스토리와 설정이 탄탄한 세계관 중심 이야기</Option>
              <Option onClick={() => handleChange('Q3', 'C')}>C. 균형 있게 둘 다 잘 녹아든 이야기</Option>
            </OptionGroup>
          </QuestionBlock>

          {/* Q4 */}
          <QuestionBlock>
            <p>4. 전개 속도는 어떻게 되길 원하나요?</p>
            <OptionGroup>
              <Option onClick={() => handleChange('Q4', 'A')}>A. 빠르게 진행되며 몰입감 있는 전개</Option>
              <Option onClick={() => handleChange('Q4', 'B')}>B. 잔잔하고 느긋하게 흐르는 이야기</Option>
              <Option onClick={() => handleChange('Q4', 'C')}>C. 반전과 기승전결이 잘 짜인 중간 템포</Option>
            </OptionGroup>
          </QuestionBlock>

          {/* Q5 */}
          <QuestionBlock>
            <p>5. 어떤 메시지나 주제를 좋아하나요?</p>
            <OptionGroup>
              <Option onClick={() => handleChange('Q5', 'A')}>A. 우정, 사랑, 가족 등 인간관계 중심</Option>
              <Option onClick={() => handleChange('Q5', 'B')}>B. 사회 문제나 철학적인 주제를 다루는 작품</Option>
              <Option onClick={() => handleChange('Q5', 'C')}>C. 성장, 도전, 자아 찾기</Option>
              <Option onClick={() => handleChange('Q5', 'D')}>D. 큰 의미 없이 그냥 재밌고 웃긴 거!</Option>
            </OptionGroup>
          </QuestionBlock>

          <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
        </FormSection>
      )}
    </Container>
  );
};

export default Survey;
