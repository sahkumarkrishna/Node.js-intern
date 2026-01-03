const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/token");

//register
exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword
  });

  res.status(201).json({
    message: "User registered successfully"
  });
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    accessToken,
    refreshToken
  });
};

// Refresh token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = generateAccessToken(decoded.userId);

    res.status(200).json({
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

//logout
exports.logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await User.updateOne(
      { refreshToken },
      { $set: { refreshToken: null } }
    );
  }

  res.status(200).json({
    message: "User logged out successfully"
  });
};
