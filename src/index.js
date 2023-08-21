import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import DriverPage from './Components/Home/DriverPage';
import AdminPage from './Components/Home/AdminPage';
import AnalystPage from './Components/Home/AnalystPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/DriverPage" element={<DriverPage />} />
        <Route path="/AnalystPage" element={<AnalystPage />} />
      </Routes>
    </Router>
  );
}

export default App;
