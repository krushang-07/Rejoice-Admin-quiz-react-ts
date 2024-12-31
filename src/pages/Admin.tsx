import React, { useState } from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";

// Types for Quiz, Question, and Options
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

const Admin: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz>({ title: '', questions: [] });
  const { theme } = useTheme();

  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [timer, setTimer] = useState<number>(10); // Default timer in seconds

  const addQuestion = () => {
    const newQuestion: Question = { question, options, correctAnswer, timer };
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, newQuestion],
    }));
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setTimer(10);
  };

  const saveQuiz = () => {
    localStorage.setItem('quiz', JSON.stringify(quiz));
    alert('Quiz saved!');
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'light' ? 'bg-gradient-to-r from-white to-white' : 'bg-black'} text-white`}>
      <div className={`max-w-3xl mx-auto p-8 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white text-black' : 'bg-black-800 text-white'}`}>
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide animate-bounce">
    QuizHub Admin Dashboard
  </h1>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="number"
            placeholder="Timer for this question (seconds)"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            className="border p-3 my-4 w-full rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-gray-500"
          />
          <button
            onClick={addQuestion}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            Add Question
          </button>
        </div>
        <button
          onClick={saveQuiz}
          className="bg-green-600 text-white px-6 py-2 mt-6 rounded-lg shadow-lg w-full hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Save Quiz
        </button>
        <div>
     
    </div>
      </div>
    </div>
  );
};

export default Admin;















































































































































