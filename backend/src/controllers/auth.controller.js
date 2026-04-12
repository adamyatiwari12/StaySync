const bcrypt = require("bcrypt");
const User = require("../models/User");
const Stay = require("../models/Stay");
const generateToken = require("../utils/generateToken");
const { validatePasswordStrength } = require("../utils/passwordValidator");

const signUp = async (req, res) => {
  try {
    const { username, email, password, code } = req.body;

    if (!username || !email || !password || !code) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    // Validate password strength
    const validation = validatePasswordStrength(password);
    if (!validation.isValid) {
      return res.status(400).json({ 
        message: "Password does not meet security requirements",
        errors: validation.errors 
      });
    }

    const stay = await Stay.findOne({ code });
    if (!stay) {
      return res.status(404).json({ message: "Invalid PG code" });
    }

    const existingUser = await User.findOne({
      email,
      stayId: stay._id
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists in this PG" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "tenant",
      stayId: stay._id
    });

    const token = generateToken({
      userId: user._id,
      role: user.role,
      stayId: user.stayId
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        stayId: user.stayId
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password, code } = req.body;

    if (!email || !password || !code) {
      return res.status(400).json({ message: "Email, password and PG code required" });
    }

    const stay = await Stay.findOne({ code });
    if (!stay) {
      return res.status(404).json({ message: "Invalid PG code" });
    }

    const user = await User.findOne({
      email,
      stayId: stay._id
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user._id,
      role: user.role,
      stayId: user.stayId
    });

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        stayId: user.stayId
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signUp, signIn };