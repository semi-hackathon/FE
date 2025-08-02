import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  border: 1px solid ${({ selected }) => (selected ? "#556cd6" : "#aaa")};
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? "#e0e0ff" : "#f9f9f9")};
  color: ${({ selected }) => (selected ? "#222" : "#333")};
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
  const userName = location.state?.userName || "사용자";

  const [showSurvey, setShowSurvey] = useState(false);
  const [answers, setAnswers] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
  });

  const handleStart = () => setShowSurvey(true);

  const handleChange = (questionKey, value) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionKey]: value };
      console.log("선택된 답변:", updated);
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      // const selectedInterests = Object.values(answers);

      // const response = await fetch("http://localhost:4000/api/survey", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     interests: selectedInterests,
      //   }),
      // });

      // if (!response.ok) {
      //   console.error("서버 응답 오류:", response.status);
      //   return;
      // }

      // const result = await response.json();
      // console.log("서버 응답 결과:", result);
      const result = answers;

      navigate("/recommend", { state: { result } });
    } catch (error) {
      console.error("설문 제출 실패:", error);
    }
  };

  const renderOption = (questionKey, value, text) => (
    <Option
      key={value}
      onClick={() => handleChange(questionKey, value)}
      selected={answers[questionKey] === value}
    >
      {text}
    </Option>
  );

  return (
    <Container>
      <Greeting>{userName}님, 반갑습니다!</Greeting>

      {!showSurvey ? (
        <StartBox>
          <StartButton onClick={handleStart}>🎯 취저 애니 찾기</StartButton>
        </StartBox>
      ) : (
        <FormSection>
          <QuestionBlock>
            <p>1. 어떤 분위기의 애니를 좋아하나요?</p>
            <OptionGroup>
              {renderOption("Q1", "A", "A. 밝고 유쾌한 분위기")}
              {renderOption("Q1", "B", "B. 감동적이고 따뜻한 분위기")}
              {renderOption("Q1", "C", "C. 어두운, 긴장감 있는 분위기")}
              {renderOption("Q1", "D", "D. 블랙코미디나 독특한 감성")}
            </OptionGroup>
          </QuestionBlock>

          <QuestionBlock>
            <p>2. 선호하는 장르는 무엇인가요?</p>
            <OptionGroup>
              {renderOption("Q2", "A", "A. 일상/로맨스")}
              {renderOption("Q2", "B", "B. 액션/모험")}
              {renderOption("Q2", "C", "C. 판타지/이세계")}
              {renderOption("Q2", "D", "D. SF/추리/스릴러")}
            </OptionGroup>
          </QuestionBlock>

          <QuestionBlock>
            <p>3. 캐릭터 중심 vs. 세계관 중심, 어떤 쪽이 더 끌리나요?</p>
            <OptionGroup>
              {renderOption("Q3", "A", "A. 캐릭터의 감정선과 성장에 집중되는 이야기")}
              {renderOption("Q3", "B", "B. 스토리와 설정이 탄탄한 세계관 중심 이야기")}
              {renderOption("Q3", "C", "C. 균형 있게 둘 다 잘 녹아든 이야기")}
            </OptionGroup>
          </QuestionBlock>

          <QuestionBlock>
            <p>4. 전개 속도는 어떻게 되길 원하나요?</p>
            <OptionGroup>
              {renderOption("Q4", "A", "A. 빠르게 진행되며 몰입감 있는 전개")}
              {renderOption("Q4", "B", "B. 잔잔하고 느긋하게 흐르는 이야기")}
              {renderOption("Q4", "C", "C. 반전과 기승전결이 잘 짜인 중간 템포")}
            </OptionGroup>
          </QuestionBlock>

          <QuestionBlock>
            <p>5. 어떤 메시지나 주제를 좋아하나요?</p>
            <OptionGroup>
              {renderOption("Q5", "A", "A. 우정, 사랑, 가족 등 인간관계 중심")}
              {renderOption("Q5", "B", "B. 사회 문제나 철학적인 주제를 다루는 작품")}
              {renderOption("Q5", "C", "C. 성장, 도전, 자아 찾기")}
              {renderOption("Q5", "D", "D. 큰 의미 없이 그냥 재밌고 웃긴 거!")}
            </OptionGroup>
          </QuestionBlock>

          <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
        </FormSection>
      )}
    </Container>
  );
};

export default Survey;
