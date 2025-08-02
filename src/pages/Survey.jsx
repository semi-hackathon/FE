import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SurveyPage = ({ userName = "사용자" }) => {
  const navigate = useNavigate();

  const [showSurvey, setShowSurvey] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      key: "Q1",
      question: "어떤 분위기의 애니를 좋아하시나요?",
      options: ["밝고 유쾌한", "잔잔하고 감성적인", "어둡고 진지한", "자극적이고 화려한"],
    },
    {
      key: "Q2",
      question: "어떤 장르의 애니를 선호하시나요?",
      options: ["판타지", "로맨스", "일상", "액션", "스릴러"],
    },
    {
      key: "Q3",
      question: "중요시하는 요소가 있으신가요?",
      options: ["캐릭터 중심", "스토리/세계관 중심", "연출/작화"],
    },
    {
      key: "Q4",
      question: "어느정도의 전개속도를 원하시나요?",
      options: ["빠른 전개", "느긋한 전개", "중간 정도"],
    },
    {
      key: "Q5",
      question: "중요시하는 애니의 주제나 메세지가 있으신가요?",
      options: ["성장", "우정", "사랑", "희망", "철학적 메시지"],
    },
  ];

  const handleAnswer = (key, option) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const handleSubmit = async () => {
    // try {
    //   // 예: 백엔드 API 주소는 필요에 따라 변경하세요.
    //   const response = await fetch("http://localhost:4000/api/survey", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(answers),
    //   });

    //   if (!response.ok) {
    //     console.error("서버 응답 오류:", response.status);
    //     return;
    //   }

    //   const result = await response.json();
    //   console.log("서버 응답 결과:", result);

    //   // 추천 페이지로 이동, 결과 state 전달
    //   navigate("/recommend", { state: { result } });
    // } catch (error) {
    //   console.error("설문 제출 실패:", error);
    // }
    console.log("설문 결과:", answers);
    navigate("/recommend", { state: { result: answers } });
  };

  const renderCurrentQuestion = () => {
    const { key, question, options } = questions[currentQuestionIndex];

    return (
      <QuestionBlock>
        <p>{question}</p>
        <Options>
          {options.map((option) => (
            <OptionButton
              key={option}
              onClick={() => handleAnswer(key, option)}
              isSelected={answers[key] === option}
            >
              {option}
            </OptionButton>
          ))}
        </Options>
      </QuestionBlock>
    );
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentAnswer = answers[questions[currentQuestionIndex].key];

  if (!showSurvey) {
    return (
      <Wrapper>
        <WelcomeBox>
          <WelcomeMessage>안녕하세요 {userName}님!</WelcomeMessage>
          <WelcomeSubMessage>취향에 맞는 애니를 추천해드릴게요.</WelcomeSubMessage>
          <StartButton onClick={() => setShowSurvey(true)}>시작하기</StartButton>
        </WelcomeBox>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>{renderCurrentQuestion()}</Container>

      {currentQuestionIndex > 0 && (
        <FixedButtonLeft onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>
          이전
        </FixedButtonLeft>
      )}

      {!isLastQuestion ? (
        <FixedButtonRight
          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          disabled={!currentAnswer}
        >
          다음
        </FixedButtonRight>
      ) : (
        <FixedButtonRight onClick={handleSubmit} disabled={!answers["Q5"]}>
          제출하기
        </FixedButtonRight>
      )}
    </Wrapper>
  );
};
export default SurveyPage;

// styled-components

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #0f0f0f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeBox = styled.div`
  text-align: center;
  color: white;
`;

const WelcomeMessage = styled.div`
  font-weight: 600;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const WelcomeSubMessage = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const StartButton = styled.button`
  padding: 14px 40px;
  font-size: 1.2rem;
  border-radius: 20px;
  border: none;
  background-color: #8A2BE2;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8A2BE2;
  }
`;

const Container = styled.div`
  max-width: 600px;
  width: 90%;
  padding: 40px 20px;
  background-color: transparent;
  text-align: center;
`;

const QuestionBlock = styled.div`
  margin-bottom: 30px;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: white;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid ${({ isSelected }) => (isSelected ? "#8A2BE2" : "#aaa")};
  background-color: ${({ isSelected }) => (isSelected ? "#8A2BE2" : "#1e1e1e")};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #8A2BE2;
    border-color: #aaa;
  }
`;

const FixedButtonLeft = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 12px 30px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  background-color: #444;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #8A2BE2;
  }
`;

const FixedButtonRight = styled(FixedButtonLeft)`
  left: auto;
  right: 20px;
  background-color: ${({ disabled }) => (disabled ? "#444" : "#8A2BE2")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#444" : "#7a1fd2")};
  }
`;
