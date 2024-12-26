// src/App.js
import './styles/App.css';
import './styles/Header.css';
import './styles/CampaignCard.css';
import './styles/CampaignForm.css';
import './styles/HomePage.css';
import './styles/CampaignPage.css';
import './styles/Dashboard.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import UserDashboardPage from './pages/UserDashboardPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaign/:id" element={<CampaignPage />} />
        <Route path="/create" element={<CreateCampaignPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
