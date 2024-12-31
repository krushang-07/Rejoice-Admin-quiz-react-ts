import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-1/4 bg-gray-800 text-white shadow-lg">
        <div className="p-5 text-center">
          <h1 className="text-3xl font-bold mb-4">QuizHub</h1>
          <p className="text-sm">Your gateway to fun and interactive quizzes!</p>
        </div>
        <ul className="mt-10">
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer">
            <Link to="/admin">Admin Panel</Link>
          </li>
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer">
            <Link to="/user">User Quiz</Link>
          </li>
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer">
            <Link to="/leaderboard">Leader Board</Link>
          </li>
        </ul>
  
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-5  bg-center"
        style={{ backgroundImage: 'url("bg-image.jpeg")' }} // Set your background image here
      >
        <div className="flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-50 p-5">
          {/* Banner Image is replaced by background image */}
          <h1 className="text-5xl font-bold mb-6 animate-bounce">Welcome to QuizHub</h1>
          <p className="text-lg mb-10">
            Challenge yourself or others with our exciting quizzes!
          </p>
          <div className="flex space-x-5">
            <button
              onClick={() => navigate('/admin')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded shadow-md transform hover:scale-105 transition-transform">
              Go to Admin Panel
            </button>
            <button
              onClick={() => navigate('/user')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded shadow-md transform hover:scale-105 transition-transform">
              Start Quiz as User
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded shadow-md transform hover:scale-105 transition-transform">
              LeaderBoard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
