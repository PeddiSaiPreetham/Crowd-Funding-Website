const express = require('express');
const Campaign = require('../models/Campaign');
const {
  getAllCampaigns,
  getCampaignById,
} = require('../controllers/campaignController');

const router = express.Router();

router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/create', async (req, res) => {
  try {
    const { name, description, targetAmount, image, creatorEmail } = req.body;
    if (!name || !description || !targetAmount || !creatorEmail) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if(!image){
      const newCampaign = new Campaign({
        name,
        description,
        targetAmount,
        creatorEmail,
      });
  
      await newCampaign.save();
    }
    else{
      const newCampaign = new Campaign({
        name,
        description,
        targetAmount,
        image,
        creatorEmail,
      });
  
      await newCampaign.save();
    }
    
    res.status(201).json({ message: 'Campaign created successfully!' });
  } catch (error) {
    console.error('Error creating campaign:', error.message);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});
  
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get campaign ID from the route parameter
    const campaign = await Campaign.findByIdAndDelete(id); // Find and delete the campaign by ID

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' }); // Handle case where campaign doesn't exist
    }

    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
