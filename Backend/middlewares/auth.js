const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.tokens;
    if (!token) {
      return res.json({ message: "invalid authentication" });
    }
    const decode= jwt.verify(token, process.env.SECRETKEY);
    console.log(decode);
    
    req.userId = decode.userid;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
