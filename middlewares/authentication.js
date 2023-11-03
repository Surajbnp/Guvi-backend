require("dotenv").config();
let jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers?.authorization;
  // console.log(token)

  jwt.verify(token, process.env.REFRESH_SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(401).send({ success : false, message: "Unauthorized" });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = authentication;