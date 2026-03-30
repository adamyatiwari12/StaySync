const bcrypt = require("bcrypt");
const Stay = require("../models/Stay");
const User = require("../models/User");

const bootstrap = async (req, res) => {
  if (process.env.ENABLE_BOOTSTRAP !== "true") {
    return res.status(404).json({ message: "Not Found" });
  }

  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(403).json({ message: "System already bootstrapped" });
    }

    const { stayName, stayCode, email, password } = req.body;

    if (!stayName || !stayCode || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const stay = await Stay.create({ name: stayName, code: stayCode });
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: "admin",
      email,
      password: hashedPassword,
      role: "admin",
      stayId: stay._id
    });

    res.status(201).json({
      message: "Bootstrap successful",
      stayId: stay._id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Bootstrap failed" });
  }
};

module.exports = bootstrap;
