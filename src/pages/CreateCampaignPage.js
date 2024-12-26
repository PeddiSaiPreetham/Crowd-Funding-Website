import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCampaignPage.css';

const CreateCampaignPage = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetAmount: '',
    image: '',
  });

  const { name, description, targetAmount, image } = formData;

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const creatorEmail = localStorage.getItem('userEmail');
    if (!creatorEmail) {
      alert('You must log in first.');
      navigate('/login');
      return;
    }
  
    console.log({ name, description, targetAmount, image, creatorEmail }); // Debug log
  
    try {
      const response = await axios.post('http://localhost:5000/api/campaigns/create', {
        name,
        description,
        targetAmount,
        image,
        creatorEmail,
      });
      console.log(response);
      if (response.status === 201) {
        alert('Campaign created successfully!');
        navigate('/manage');
      }
    } catch (error) {
      console.error('Error creating campaign:', error.response?.data || error.message);
      alert('Failed to create the campaign. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto p-8">
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
      <h1 className="text-3xl font-semibold mb-8 text-center">Create New Campaign</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campaign Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Campaign Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter campaign name"
            required
          />
        </div>

        {/* Campaign Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter campaign description"
            required
          />
        </div>

        {/* Target Amount */}
        <div>
          <label htmlFor="targetAmount" className="block text-sm font-medium">
            Target Donation Amount
          </label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={targetAmount}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter target donation amount"
            required
          />
        </div>

        {/* Campaign Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Campaign Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter image URL for the campaign"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="submit-btn">
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaignPage;
