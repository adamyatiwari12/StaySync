const jwt = require("jsonwebtoken");

const generateToken = ({ userId, role, stayId }) => {
  const payload = {
    userId,
    role,
    stayId: stayId || null
  };

  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports = generateToken;
