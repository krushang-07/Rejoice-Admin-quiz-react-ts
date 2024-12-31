import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useTheme } from "../utils/ThemeProvider.tsx";

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
  const [quiz, setQuiz] = useState<Quiz | null>(null);  //if any question are not than quiz are null otherwise quiz have a questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); //that show the current question index for the direction
  const [answers, setAnswers] = useState<(string | null)[]>([]); //set answer
  const [timer, setTimer] = useState<number>(0);   //set timer value in state
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);  //set end time state
  const [quizStarted, setQuizStarted] = useState<boolean>(false);  //set quiz started or not state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Track selected answer
  const [quizCompleted, setQuizCompleted] = useState<Boolean>(false);  //set quiz completed or not state
  const [score, setScore] = useState<number>(0); // State to store score
  const { theme } = useTheme();

  useEffect(() => {
    const savedQuiz = localStorage.getItem("quiz");  //get stored quiz data from local storage
    if (savedQuiz) {
      const parsedQuiz: Quiz = JSON.parse(savedQuiz);  //convert back to string to object 
      setQuiz(parsedQuiz);
      if (parsedQuiz.questions.length > 0) {
        setTimer(parsedQuiz.questions[0].timer); // Set timer for the first question
      }
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);  //every 1 second the timer value are decrement
      return () => clearInterval(interval);
    } else {
      setIsTimeUp(true);  //when the timer value are 0 then times up are true 
    }
  }, [timer]);

  const handleAnswer = (answer: string) => {
    if (!isTimeUp && !selectedAnswer) { // Ensure you can only select one answer
      setSelectedAnswer(answer); // Set selected answer store
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
      calculateResult(); ///when quiz are in last question than the calculate the result and function call
    } 
  };
  

  const calculateResult = () => {
    if (quiz) {
      const score = quiz.questions.reduce((acc, question, index) => {
        return acc + (question.correctAnswer === answers[index] ? 1 : 0);  //if correct answer are matched to the answer index than add 1 otherwise set zero
      }, 0);
      setScore(score);
      setQuizCompleted(true);
    }
  };

  if (!quiz) {  //when quiz are not render or not found than set loading
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

  const currentQuestion = quiz.questions[currentQuestionIndex]; //assign current question value

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
        <div
          className={`flex flex-col items-center justify-center min-h-screen ${
            theme === 'light' ? 'bg-white' : 'bg-black-900'
          }`}
        >
          <h1 className="text-4xl font-bold text-white-800 mb-6">Welcome to QuizHub</h1>
          <p className="text-lg text-gray-600 mb-10">Get ready to test your knowledge!</p>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center min-h-screen ${
            theme === 'light' ? 'bg-gray-100' : 'bg-black'
          }`}
        >
            <div className={`w-full max-w-2xl p-8 rounded-lg shadow-md ${
            theme === 'light' ? 'bg-gray-100' : 'bg-black'
          }`}>
            <h1
              className={`text-2xl font-bold text-gray-800 mb-4 ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}
            >
              {quiz.title}
            </h1>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} / {quiz.questions.length}
              </p>
              <p className="text-sm text-gray-500">Time Remaining: {timer} seconds</p>
            </div>
            <p
              className={`text-lg font-medium mb-6 ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}
            >
              {currentQuestion.question}
            </p>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isTimeUp || (selectedAnswer !== null && option !== selectedAnswer)}
                className={`block w-full py-3 px-4 mb-4 rounded-lg text-left border ${
                  option === selectedAnswer
                    ? 'bg-gray-300 text-white-700'
                    : theme === 'light'
                    ? 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                } ${isTimeUp ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : ''}`}
              >
                {option}
              </button>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={skipQuestion}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
              >
                Skip Question
              </button>
              {selectedAnswer && (
                <button
                  onClick={goToNextQuestion}
                  disabled={!selectedAnswer}
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-900"
                >
                  Next Question
                </button>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-900"
              >
                Reset Quiz
              </button>
            </div>
            {quizCompleted && (
              <div className="mt-6">
                <h3 className="text-m text-green-600">Quiz Completed🎉</h3>
                <h2 className="text-2xl font-bold text-gray-800">
                  Your Score: {score} / {quiz.questions.length}
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
