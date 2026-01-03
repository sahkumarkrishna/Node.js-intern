require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();
// Middleware
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
// Start Server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
startServer();
