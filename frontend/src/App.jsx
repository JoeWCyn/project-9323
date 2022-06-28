import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import MainPage from './components/MainPage/MainPage';
import Question from './components/QuestionDetail/QuestionDetail';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
