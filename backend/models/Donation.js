const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorEmail: {
    type: String,
    required: true,
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,  // Refers to Campaign model
    required: true,
    ref: 'Campaign',
  },
  campaignName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
});

// Create a unique compound index on donorEmail and campaignId to ensure a single donation per user for a campaign
donationSchema.index({ donorEmail: 1, campaignId: 1 }, { unique: true });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
