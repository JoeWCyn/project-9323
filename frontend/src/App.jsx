import React from 'react';
import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import QuestionEdit from './pages/QuestionEdit'
import SingleQuestionEdit from './pages/SingleQuestionEdit'
import QuizStart from './pages/QuizStart'
import Result from './pages/Result'

function App () {
  return (
    <div className='body'>
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Welcome />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/quizEdit/:questionId" element={<QuestionEdit />} />
          <Route exact path="/quizEdit/:quizid/:questionId" element={<SingleQuestionEdit />} />
          <Route exact path="/quiz/:sessionId/:playerId" element={<QuizStart />} />
          <Route exact path="/quiz/result/:quizId" element={<Result />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
