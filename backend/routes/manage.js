const express = require('express');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');  
const router = express.Router();

router.get('/user', async (req, res) => {
    try {
      const email  = req.query.userEmail;
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      const campaigns = await Campaign.find({ creatorEmail: email });
      if (!campaigns) {
        return res.status(404).json({ message: 'No campaigns found for this user' });
      }
      res.status(200).json(campaigns);
    } catch (error) {
      console.error('Error fetching user campaigns:', error.message);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
  });  

  router.get('/curr', async (req, res) => {
    try {
      const email = req.query.userEmail;
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      const campaigns = await Donation.find({ donorEmail: email });
  
      if (!campaigns) {
        return res.status(404).json({ message: 'No campaigns found for this user' });
      }
      res.status(200).json(campaigns);
    } catch (error) {
      console.error('Error fetching user campaigns:', error.message);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
  });
module.exports = router;
