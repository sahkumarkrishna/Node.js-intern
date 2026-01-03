const jwt= require('jsonwebtoken');
const {accessTokenExpiryIn, refreshTokenExpiryIn}= require('../config/jwt');
exports.generateAccessToken= (userId)=>{
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: accessTokenExpiryIn});
    
};
exports.generateRefreshToken= (userId)=>{
    return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: refreshTokenExpiryIn});
};