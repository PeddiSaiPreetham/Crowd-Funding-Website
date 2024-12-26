const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

router.post('/donations', async (req, res) => {
  const { donorEmail, campaignId, amount } = req.body;

  if (!donorEmail || !campaignId || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid donation details.' });
  }

  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    let donation = await Donation.findOne({ donorEmail, campaignId });

    if (donation) {
      donation.amount = Number(donation.amount)+Number(amount);
    } else {
      donation = new Donation({
        donorEmail,
        campaignId,
        campaignName: campaign.name,
        amount,
      });
    }
    await donation.save();
    campaign.moneyReceived += Number(amount);
    await campaign.save();

    res.status(200).json({ message: 'Donation successful!' });
  } catch (error) {
    console.error('Error processing donation:', error.message);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;