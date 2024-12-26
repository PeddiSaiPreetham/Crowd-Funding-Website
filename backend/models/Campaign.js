const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  moneyReceived: { type: Number, default: 0 },
  image: { type: String , default: "https://th.bing.com/th/id/R.96f9c991c021da8e3020d14f0edd43d6?rik=i44arF6d1USQWw&riu=http%3a%2f%2ffinances-et-patrimoine.fr%2fwp-content%2fuploads%2f2019%2f09%2fCrowdfundingBild1.jpg&ehk=BLmhoY4eQaGr24qVItpfXeOaZD7bPnqBWrqMvJdTdgM%3d&risl=&pid=ImgRaw&r=0"}, // store the image URL
  creatorEmail: { type: String, required: true },
});

module.exports = mongoose.model('Campaign', CampaignSchema);
