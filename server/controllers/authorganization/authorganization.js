const User = require("../../database/models/user");
const School = require('../../database/models/school')
const Student = require('../../database/models/student')
const bcrypt = require("bcrypt");
const Token = require("../../helper/token");
const MailService = require('../../utils/mailService')
const crypto = require('crypto');
const CryptoJS = require('crypto-js')
var encryptDecrypt = require("../../helper/encryptDecrypt");
exports.register = async (req, res) => {
  let { name, email, password } = req.body;

  // Check All Field is filled or not
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All field is required" });
  }

  // Check User is already Exist or not
  let checkUser = await User.findOne({ email });
  if (checkUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already Exist" });
  }

  let newUser = new User({ name, email, password, roleId: 1 });
  try {
    await newUser.validate();
    await newUser.save();
    return res.status(201).json({ success: true, message: "Welcome" });
  } catch (err) {
    console.log("Validation", err);
    return res
      .status(400)
      .json({ success: false, message: "All Feild is required" });
  }
};

exports.signIn = (req, res) => {
  const { email = false, password = false } = req.body;
  // Check All Field is filled or not
  if (!email || !password) {
    return res.status(400).json({ success: true, message: "All input is required" });
  }
  User.findOne({ email })
    .then((userData) => {
      // Check password is same or not
      bcrypt.compare(
        password,
        userData.password,
        function (err, bcryptRes) {
          if (bcryptRes) {

            const token = Token.create({
              id: userData.id,
              name: userData.name,
              roleId: userData.roleId,
              createdById: userData.roleId,
              fullName: userData.name
            });
            return res.status(200).json({ success: true, message: "Welcome", token });
          } else {
            return res.status(400).json({ success: false, message: "Incorrect passwords" });
          }
        }
      );
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    });
};

// forgot password
exports.forgotPaasword = async (req, res) => {
  let { email, type } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const buffer = crypto.randomBytes(256);
    const token = buffer.toString('hex');
    let user;
    switch (type?.toLowerCase()) {
      case 'admin':
        user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({
            message: "Email doesn't exists",
            success: false
          })
        }
        break;
      case 'school':
        user = await School.findOne({ email, isDeleted: false });
        if (!user) {
          return res.status(400).json({
            message: "Email doesn't exists",
            success: false
          })
        }
        break;
      case 'student':
        user = await Student.findOne({ email, isDeleted: false });
        if (!user) {
          return res.status(400).json({
            message: "Email doesn't exists",
            success: false
          })
        }
        break;
      default:
        return;
    }
    user.resetToken = token
    user.resetTokenExpiry = Date.now() + 3600000
    await user.save();
    let b = {
      roleId: user.roleId,
      user_id: user._id,
      email: user.email,
      token: token
    }
    let obj = {
      subjectOfEmail: "Please reset your password ",
      email: user.email,
      data: b
    }
    MailService(obj, "forgot-password");
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  }
  catch (err) {
    console.log(err, "er")
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
}

// reset password
exports.changePassword = async (req, res) => {
  try {
    const { token, password, roleId, user_id, email, confrm_password } = req.body;
    if (!password || !confrm_password) {
      return res.status(400).json({ success: false, message: 'Password and confirm password required' });
    }
    if (password !== confrm_password) {
      return res.status(400).json({ success: false, message: 'Password and confirm password do not match' });
    }

    let user;
    switch (+roleId) {
      case 1:
        user = await User.findOne({
          email: email,
          _id: user_id
        });
        if (!user) {
          return res.status(400).json({ success: false, message: 'User doesnt exists' });
        }
        user = await User.findOne({
          resetToken: token,
          resetTokenExpiry: { $gt: Date.now() }
        });
        if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }
        break;
      case 2:
        user = await Student.findOne({
          email: email,
          _id: user_id
        });
        if (!user) {
          return res.status(400).json({ success: false, message: 'User doesnt exists' });
        }
        user = await Student.findOne({
          resetToken: token,
          resetTokenExpiry: { $gt: Date.now() }
        });
        if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }
        break;
      case 3:
        user = await School.findOne({
          email: email,
          _id: user_id
        });
        if (!user) {
          return res.status(400).json({ success: false, message: 'User doesnt exists' });
        }
        user = await School.findOne({
          resetToken: token,
          resetTokenExpiry: { $gt: Date.now() }
        });
        if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }
        break;
      default:
        return;
    }
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    return res.status(200).json({ success: true, message: 'Password reset successfully' });

  }
  catch (err) {
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
}


exports.createNewPassword = async (req, res) => {
  let { id, type, newPassword, confirmPassword } = req.body;
  try {
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Password and confirm password required' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Password and confirm password do not match' });
    }
    let user;
    switch (type?.toLowerCase()) {
      case 'school':
        user = await School.findOne({ _id: id, isDeleted: false });
        if (!user) {
          return res.status(400).json({
            message: "Email doesn't exists",
            success: false
          })
        }
        break;
      case 'student':
        user = await Student.findOne({ _id: id, isDeleted: false });
        if (!user) {
          return res.status(400).json({
            message: "Email doesn't exists",
            success: false
          })
        }
        break;
      default:
        return;
    }

    user.password = newPassword;
    user.loginfirstTime = 1;
    await user.save();
    return res.status(200).json({ success: true, message: "Password created successfully , please login" });

  }
  catch (err) {
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
}