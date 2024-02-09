const Student = require("../../database/models/student");
const MailService = require("../../utils/mailService");
const Token = require('../../helper/token');
const bycrpt = require('bcrypt')
const mongoose = require('mongoose')

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check All Field is filled or not
    if (!email || !password) {
      return res.status(400).json({
        message: "All input is required",
        success: false
      });
    }
    let emailExist = await Student.findOne({ email, isDeleted: false }).lean();
    if (!emailExist) {
      return res.status(400).json({
        message: "Email doesn't exists",
        success: false
      })
    }
    let passwordExists = await bycrpt.compare(password, emailExist.password)
    if (!passwordExists) {
      return res.status(400).json({
        message: "Password doesn't exists",
        success: false
      })
    }
    const token = Token.create({
      id: emailExist._id,
      name: emailExist.fName,
      fullName: emailExist.fName + " " + emailExist.lName,
      roleId: emailExist.roleId,
      createdById: emailExist.createdById,
      createdBy: emailExist.createdBy,
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

exports.addStudent = async (req, res) => {
  let {
    fName,
    lName,
    email,
    password,
    city,
    state,
    country,
    departmentId,
    courseId,
    phone,
    address1,
    address2,
  } = req.body;
  try {

    let createStudent = new Student({
      fName,
      lName,
      email,
      password,
      city,
      state,
      country,
      departmentId,
      courseId,
      phone,
      createdBy: req.userId,
      updatedBy: req.userId,
      createdById: req.roleId,
      address1,
      address2,
      roleId: 2
    });
    await createStudent.validate();
    let obj = {
      subjectOfEmail: "Credential for Login",
      email: createStudent.email,
      password: password
    }
    await createStudent.save();
    MailService(obj, "sendToStudent")
    return res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: createStudent,
    });
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
};

exports.getStudent = async (req, res) => {
  const pageNmuber = parseInt(req.query.pageNumber) || 1
  const limit = parseInt(req.query.limit) || 5;
  const skip_no = parseInt(pageNmuber - 1) * limit;
  let checkStudent = req.createdById === undefined ? { isDeleted: false, roleId: 2 } : req.roleId === 3 ? {
    isDeleted: false,
    $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), createdById: req.createdById }]
  } : { isDeleted: false };
  try {
    let countDocuments = 0;
    let data;
    if (req.params.id) {
      data = await Student.findById({ _id: req.params.id });
    } else {
      data = await Student.find(checkStudent).skip(skip_no).limit(limit).populate('departmentId').populate('courseId').sort({ createdAt: -1 });
      countDocuments = await Student.countDocuments(checkStudent);
      countDocuments = await Student.find(checkStudent).populate('departmentId').populate('courseId').countDocuments();
      console.log(countDocuments, "count")

    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "Student not found" });
    }
    return res
      .status(200)
      .json({
        success: true, message: "Student Fetched successfully", data, totalCount: countDocuments,
        totalPages: Math.ceil(countDocuments / limit)
      });
  } catch (error) {
    console.log(error, "err")
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateStudent = async (req, res) => {
  let {
    fName,
    lName,
    email,
    password,
    city,
    state,
    country,
    departmentId,
    courseId,
    phone,
    address1,
    address2,
  } = req.body;
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Student not found" });
    }
    await Student.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fName,
        lName,
        email,
        password,
        city,
        state,
        country,
        departmentId,
        courseId,
        phone,
        roleId: 2,
        address1,
        address2,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Student is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Student not found" });
    }
    await Student.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return res
      .status(200)
      .json({ success: true, message: "Student is deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};


exports.checkEmail = async (req, res) => {
  try {
    let { email } = req.body
    let emailExist = await Student.findOne({ email });
    if (emailExist) {
      return res.json({
        success: true,
        message: "Email Already exists",
      });
    }
    return res.status(200).json({
      success: false,
      message: "",
    });
  }
  catch (err) {

  }
} 