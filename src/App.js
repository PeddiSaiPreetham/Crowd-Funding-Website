import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/CampaignForm.css';

import HomePage from './pages/HomePage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import DashboardPage from './pages/DashboardPage';
import ManageCampaignsPage from './pages/ManageCampaignsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CampaignDetailPage from './components/CampaignDetailPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateCampaignPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/manage" element={<ManageCampaignsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/campaign/:_id" element={<CampaignDetailPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
