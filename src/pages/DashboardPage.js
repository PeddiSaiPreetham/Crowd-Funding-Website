// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DashboardPage = () => {
  const navigate = useNavigate();
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);

  useEffect(() => {
    const fetchDonatedCampaigns = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail'); // Get email from localStorage
  
        const response = await axios.get('http://localhost:5000/api/manage/curr',{
          params: { userEmail },
        });
        setDonatedCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching donated campaigns', error);
      }
    };
    fetchDonatedCampaigns();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="header">
        <h1 onClick={() => navigate('/')}>FundNow</h1>
      </div>
      {/* Navbar with text links */}
      <div className="navbar">
        <a onClick={() => navigate('/')}>Home</a>
        <a onClick={() => navigate('/create')}>Create Campaign</a>
        <a onClick={() => navigate('/dashboard')}>Dashboard</a>
        <a onClick={() => navigate('/manage')}>Manage Campaigns</a>
        <a onClick={() => navigate('/profile')}>Profile</a>
      </div>
   
      <h1>Your Donated Campaigns</h1>
      <div >
        {donatedCampaigns.map(donation => (
          <div key={donation._id} className="campaign-card border p-4 rounded-lg shadow-md">
            <h3>{donation.campaignName}</h3>
            <p>Money donated: {donation.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
