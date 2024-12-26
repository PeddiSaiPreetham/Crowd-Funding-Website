import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignCard from '../components/CampaignCard';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // Get email from localStorage
    if (email) {
      setUserEmail(email); // Set user email state if email exists
    } else {
      navigate('/login'); // Redirect to login if email doesn't exist
    }

    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Remove the email from localStorage
    setUserEmail(null); // Clear user email state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container mx-auto py-8">
      <div className="header">
      <h1 onClick={() => navigate('/')}>FundNow</h1>
        {/* Logout button aligned to the right */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Navbar with text links */}
      <div className="navbar">
        <a onClick={() => navigate('/')}>Home</a>
        <a onClick={() => navigate('/create')}>Create Campaign</a>
        <a onClick={() => navigate('/dashboard')}>Dashboard</a>
        <a onClick={() => navigate('/manage')}>Manage Campaigns</a>
        <a onClick={() => navigate('/profile')}>Profile</a>
      </div>

      <h2 className="text-xl font-medium text-center my-8">Browse Campaigns</h2>

      <div className="grid">
        {campaigns.map(campaign => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
