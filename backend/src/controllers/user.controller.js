const User = require("../models/User");

const getTenants = async (req, res) => {
  try {
    const tenants = await User.find({
      role: "tenant",
      stayId: req.user.stayId
    })
      .select("_id username email roomId")
      .populate("roomId", "roomNumber");

    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findOne({
      _id: req.user.userId,
      stayId: req.user.stayId
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.username = name;
    if (email) user.email = email;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.userId,
      stayId: req.user.stayId
    }).populate(
      "roomId",
      "roomNumber floor rentAmount capacity occupiedCount"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
      room: user.roomId || null
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTenants,
  updateProfile,
  getProfile
};
