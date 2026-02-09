const jwt = require("jsonwebtoken");

const generateToken = ({ userId, role}) => {
  const payload = {
    userId,
    role
  };

  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports = generateToken;
