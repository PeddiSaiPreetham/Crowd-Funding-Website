import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CampaignDetailPage.css';  // Import custom CSS for styling

const CampaignDetailPage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();  // Get ID from URL params
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/campaigns/${_id}`);
        setCampaignDetails(response.data);
      } catch (error) {
        console.error('Error fetching campaign details:', error.message);
      }
    };

    fetchCampaignDetails();
  }, [_id]);

  const handleDonateClick = () => {
    setShowDonateForm(true); // Show the donation form
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    const creatorEmail = localStorage.getItem('userEmail');
    if (!donationAmount || donationAmount <= 0 || Number(donationAmount) + Number(campaignDetails.moneyReceived) > campaignDetails.targetAmount) {
      alert('Please enter a valid donation amount.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/donations', {
        donorEmail: creatorEmail,  // Replace with the actual logged-in user's email
        campaignId: _id,  // The campaign ID
        amount: donationAmount,
      });
  
      if (response.status === 200) {
        setDonationSuccess(true);
        setDonationAmount('');
        setShowDonateForm(false);
      }
    } catch (error) {
      console.error('Error making donation:', error.message);
      alert('There was an issue with your donation. Please try again.');
    }
  };
  

  if (!campaignDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="campaign-detail-page">
      <div className="campaign-detail-container">
        <h1 className="campaign-title">{campaignDetails.name}</h1>
        <p className="campaign-description">{campaignDetails.description}</p>
        <div className="campaign-info">
          <p><strong>Target Amount:</strong> ${campaignDetails.targetAmount}</p>
          <p><strong>Money Received:</strong> ${campaignDetails.moneyReceived}</p>
        </div>
        <div className="campaign-image">
          <img src={campaignDetails.image} alt={campaignDetails.name} />
        </div>

        {/* Donate Button */}
        {!showDonateForm && !donationSuccess && (
          <button className="donate-btn" onClick={handleDonateClick}>Donate</button>
        )}


        {/* Donation Form */}
        {showDonateForm && !donationSuccess && (
          <form className="donation-form" onSubmit={handleDonationSubmit}>
            <label htmlFor="donationAmount">Enter Donation Amount</label>
            <input
              type="number"
              id="donationAmount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
            <button type="submit" className="donate-submit-btn">Donate</button>
          </form>
        )}

        {/* Donation Success Message */}
        {donationSuccess && <p className="donation-success">Thank you for your donation!</p>}
      </div>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default CampaignDetailPage;
