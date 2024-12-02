import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
