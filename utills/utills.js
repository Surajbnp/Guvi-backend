const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = ({ userId = null, email = null }) => {
  const refreshToken = jwt.sign(
    { userId: userId, email: email},
    process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: "7days",
    }
  );
  return {
    refreshToken,
  };
};

module.exports = generateToken;
