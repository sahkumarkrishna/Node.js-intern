const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

// User Registration
exports.register = async (req, res) => {
    const {name,email,password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10);
    await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json({message:'User registered successfully'});
};

// User Login
exports.login = async (req, res) => {
    const {email,password}= req.body;
    const user= await User.findOne({email});
    if(!user){
        return  res.status(400).json({message:'Invalid email or password'});
    }           
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:'Invalid email or password'});
    }
    const accessToken= generateAccessToken(user._id);
    const refreshToken= generateRefreshToken(user._id);
    res.status(200).json({accessToken, refreshToken});
};

// Token Refresh        

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;  
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken(decoded.userId);
        res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};
// User Logout
exports.logout = (req, res) => {
    // Invalidate the refresh token on client side
    res.status(200).json({ message: 'User logged out successfully' });
};
