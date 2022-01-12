import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './about/AboutPage';
import CoursesPage from './courses/CoursesPage';
import Header from './common/Header';
import HomePage from './home/HomePage';
import ManageCoursePage from './courses/ManageCoursePage';
import PageNotFound from './PageNotFound';

const App = () => (
  <div className="container-fluid">
    <Header />
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/course/:slug" element={<ManageCoursePage />} />
      <Route path="/course" element={<ManageCoursePage />} />
      <Route element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
