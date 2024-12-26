// src/pages/ManageCampaignsPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageCampaignsPage.css';

const ManageCampaignsPage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail'); // Get email from localStorage
  
    if (!userEmail) {
      navigate('/login'); // Redirect to login if not logged in
    }
  
    // Define the fetchUserCampaigns function
    const fetchUserCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/manage/user', {
          params: { userEmail }, // Pass email as query parameter
        });
        setCampaigns(response.data); // Update the state with fetched campaigns
      } catch (error) {
        console.error('Error fetching user campaigns:', error);
      }
    };
  
    fetchUserCampaigns(); // Call the function
  }, [navigate]);
  
  

  // const handleEditCampaign = (campaignId) => {
  //   navigate(`/edit/${campaignId}`);
  // };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/campaigns/${campaignId}`);
      alert(response.data.message); // Display success message
      window.location.reload();
    } catch (error) {
      console.error('Error deleting campaign:', error.response.data.message || error.message);
      alert('Failed to delete campaign. Please try again.');
    }
  };
  
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
      <h1 className="text-3xl font-semibold mb-8 text-center">Manage Your Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card border p-4 rounded-lg shadow-md">
              <img src={campaign.image} alt={campaign.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="font-bold text-xl mt-4">{campaign.name}</h3>
              <p>{campaign.description}</p>
              <p>Target: ${campaign.targetAmount}</p>
              <p>Money Raised: ${campaign.moneyReceived}</p>
              <div className="flex space-x-4 mt-4">
                {/* <button
                  onClick={() => handleEditCampaign(campaign._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDeleteCampaign(campaign._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You have no campaigns. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default ManageCampaignsPage;
