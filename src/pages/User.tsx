import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  timer: number;
};

type Quiz = {
  title: string;
  questions: Question[];
};

const User: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Track selected answer
  const [quizCompleted, setQuizCompleted] = useState<Boolean>(false);
  const [score, setScore] = useState<number>(0); // State to store score

  useEffect(() => {
    const savedQuiz = localStorage.getItem("quiz");
    if (savedQuiz) {
      const parsedQuiz: Quiz = JSON.parse(savedQuiz);
      setQuiz(parsedQuiz);
      if (parsedQuiz.questions.length > 0) {
        setTimer(parsedQuiz.questions[0].timer); // Set timer for the first question
      }
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsTimeUp(true);
    }
  }, [timer]);

  const handleAnswer = (answer: string) => {
    if (!isTimeUp && !selectedAnswer) { // Ensure you can only select one answer
      setSelectedAnswer(answer); // Set selected answer
      setAnswers((prev) => [...prev, answer]);
    }
  };
  
  const skipQuestion = () => {
    setAnswers((prev) => [...prev, null]);
    setSelectedAnswer(null); // Reset selected answer when skipping
    goToNextQuestion();
  };
  
  // Reset selected answer for the next question
  const goToNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimer(quiz.questions[nextIndex].timer);
      setIsTimeUp(false);
      setSelectedAnswer(null);  // Reset selected answer for the next question
    } else {
      calculateResult();
    }
  };
  

  const calculateResult = () => {
    if (quiz) {
      const score = quiz.questions.reduce((acc, question, index) => {
        return acc + (question.correctAnswer === answers[index] ? 1 : 0);
      }, 0);
      setScore(score);
      //alert(`Your Score: ${score} / ${quiz.questions.length}`);
      setQuizCompleted(true);
    }
  };

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Loading your quiz, please wait...
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <>
      {quizCompleted && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
      )}
      {!quizStarted ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to QuizHub</h1>
          <p className="text-lg text-gray-600 mb-10">Get ready to test your knowledge!</p>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} / {quiz.questions.length}
              </p>
              <p className="text-sm text-gray-600">Time Remaining: {timer} seconds</p>
            </div>
            <p className="text-lg font-medium text-gray-800 mb-6">
              {currentQuestion.question}
            </p>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isTimeUp || (selectedAnswer !== null && option !== selectedAnswer)}  // Disabled when timer is up or answer is selected
                className={`block w-full py-3 px-4 mb-4 rounded-lg text-left border
                   ${
                    option === selectedAnswer
                      ? "bg-blue-500 text-blue-700"  // Highlight selected answer
                      : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                  }
                  ${
                    isTimeUp
                      ? "bg-gray-300 border-gray-300 cursor-not-allowed"
                      : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                  } 
               `}>
                {option}
              </button>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={skipQuestion}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                Skip Question
              </button>
              {selectedAnswer && (
                <button
                  onClick={goToNextQuestion}
                  disabled={!selectedAnswer}  // Disable until an answer is selected
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  Next Question
                </button>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Reset Quiz
              </button>
              </div>
              {/* Display score when quiz is completed */}
            {quizCompleted && (
                <div className="mt-6">
                  <h3 className="text-m text-green-600">Quiz Completed🎉</h3>
                <h2 className="text-2xl font-bold text-gray-800">Your Score: {score} / {quiz.questions.length}</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
