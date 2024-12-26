const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
};

// Initialize express
const app = express();
app.use(cors());
app.use(express.json()); // Use express.json() for parsing JSON bodies

// Connect to the database
connectDB();

// Import routes
const userRoutes = require('./routes/users'); 
const campaignRoutes = require('./routes/campaignRoutes'); 
const donationRoutes = require('./routes/donations'); 
const manageRoute = require('./routes/manage');

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api', donationRoutes);
app.use('/api/manage', manageRoute);

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server on the defined port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
