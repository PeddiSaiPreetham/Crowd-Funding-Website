// src/components/CampaignCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CampaignCard.css';

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <img src={campaign.image} alt={campaign.name} />
      <h2>{campaign.name}</h2>
      <p>{campaign.description}</p>
      <p>Target: {campaign.targetAmount}</p>
      <p>Money Raised: {campaign.moneyReceived}</p>
      <button onClick={() => {
        console.log("Navigating to campaign with name:", campaign._id);
        navigate(`/campaign/${campaign._id}`);
      }}>View Details</button>
    </div>
  );
};

export default CampaignCard;
