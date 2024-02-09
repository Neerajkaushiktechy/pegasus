const School = require("../../database/models/school");
const MailService = require("../../utils/mailService");
const Token = require('../../helper/token');
const bcrypt = require("bcrypt");

exports.signIn = async (req, res) => {
  try {
    const { email, password, schoolId } = req.body;
    if (!email || !password || !schoolId) {
      return res.status(400).json({
        message: "All input is required",
        success: false
      });
    }
    let checkSchool_Id = await School.findOne({ user_Id: schoolId, isDeleted: false });
    if (!checkSchool_Id) {
      return res.status(400).json({
        message: "School Id doesn't exists",
        success: false
      })
    }

    let emailExist = await School.findOne({ email, isDeleted: false }).lean();
    if (!emailExist) {
      return res.status(400).json({
        message: "Email doesn't exists",
        success: false
      })
    }

    let passwordExists = await bcrypt.compare(password, emailExist.password)
    if (!passwordExists) {
      return res.status(400).json({
        message: "Password doesn't exists",
        success: false
      })
    }
    const token = Token.create({
      id: emailExist._id,
      name: emailExist.cp_fName,
      roleId: emailExist.roleId,
      createdById: 3,
      createdBy: emailExist.createdBy,
      fullName: emailExist.cp_fName + " " + emailExist.cp_lName,
      createdBySchoolName: emailExist.schoolName
    });

    return res
      .status(200)
      .json({ success: true, loginfirstTime: emailExist?.loginfirstTime, id: emailExist?._id, message: "Welcome", token });
  }
  catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  };
}

exports.addSchool = async (req, res) => {
  let {
    schoolCode,
    schoolName,
    cp_fName,
    cp_lName,
    email,
    password,
    phone,
    cp_email,
    cp_phone,
    address,
    user_Id,
  } = req.body;
  try {

    let createSchool = new School({
      schoolCode,
      schoolName,
      cp_fName,
      cp_lName,
      email,
      password,
      phone,
      address,
      createdBy: req.userId,
      updatedBy: req.userId,
      createdById: req.roleId,
      address,
      cp_email,
      cp_phone,
      user_Id,
      roleId: 3
    });
    await createSchool.validate();
    let obj = {
      subjectOfEmail: "Credential for School Login",
      email: createSchool.email,
      password: password,
      schoolId: createSchool?.user_Id
    }
    await createSchool.save();
    MailService(obj, "sendToSchool")
    return res.status(200).json({
      success: true,
      message: "School created successfully",
      data: createSchool,
    });
  } catch (err) {
    console.log('err', err)
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
};


exports.getSchool = async (req, res) => {
  try {

    let data;
    if (req.params.id) {
      data = await School.findById({ _id: req.params.id, isDeleted: false });
    } else {
      data = await School.find({ isDeleted: false, createdById: req.roleId })
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "School not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "School Fetched successfully", data });
  } catch (error) {
    console.log('err', error)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateSchool = async (req, res) => {
  let {
    schoolCode,
    schoolName,
    cp_fName,
    cp_lName,
    email,
    password,
    phone,
    address,
    cp_email,
    cp_phone,
    user_Id
  } = req.body;
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Schhool not found" });
    }
    await School.findByIdAndUpdate(
      { _id: req.params.id },
      {
        schoolCode,
        schoolName,
        cp_fName,
        cp_lName,
        email,
        password,
        phone,
        address,
        createdBy: req.userId,
        updatedBy: req.userId,
        createdById: req.roleId,
        address,
        cp_email,
        cp_phone,
        user_Id,
        roleId: 3
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "School is Updated" });
  } catch (error) {
    console.log('error', error)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "School not found" });
    }
    await School.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return res
      .status(200)
      .json({ success: true, message: "School is deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    let checkObject = {
      ...req.body,
    }
    let emailExist = await School.findOne(checkObject).select('-password');
    if (emailExist) {
      return res.json({
        success: true,
        type: Object.keys(req.body).toString(),
        message: "Email Already exists",
      });
    }
    return res.status(200).json({
      success: false,
      message: "",
    });
  }
  catch (err) {
    console.log('err', err)
  }
} 