const UserModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generatetoken = (user) => {
  const accesstoken = jwt.sign(
    { userid: user._id, email: user.email },
    process.env.SECRETKEY,
    {
      expiresIn: "15m",
    }
  );
  const refreshtoken = jwt.sign(
    { userid: user._id, email: user.email },
    process.env.SECRETKEY,
    {
      expiresIn: "7d",
    }
  )
  return {accesstoken,refreshtoken}
};
const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(200).json({ message: "require all field" });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "user alredy exists" });
    }
    
    const hashpasskey = await bcrypt.hash(password, 10);

    const newuser = await UserModel.create({
      fullname,
      email,
      password: hashpasskey,
    });
    const token= generatetoken(newuser)
    return res.json({ newuser, success: true ,token:token.accesstoken,tokenx:token.refreshtoken});
  } catch (error) {
    return res.json({ message: "error try again please", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    

    if (!user) {
      return res
        .status(500)
        .json({ message: "you are not existing user", success: false });
    }
    const passkey = await bcrypt.compare(password, user.password);
    if (!passkey) {
      return res.json({ message: "incorrect password", success: false });
    }
    const token=generatetoken(user)
    res.status(200).cookie('tokens',token.accesstoken,{
        httpOnly:true,
        sameSite:"strict",
    })
  } catch (error) {
    return res.json({ message: "error while login" });
  }
  return res.json({ message: "user login successfully", success: true });
};
const logout=async(req,res,next)=>{
     try {
       res.clearCookie('tokens',null,{maxAge:0})
       return res.json({messsage:'logout successfully',success:true})
     } catch (error) {
      console.log(error);
      
     }
}
module.exports = { register, login ,logout };





























