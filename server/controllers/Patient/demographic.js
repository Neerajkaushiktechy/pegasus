const fs = require("fs");
const PatientsDemographic = require("../../database/models/patientDemographic");
const User = require("../../database/models/user");
const mongoose = require('mongoose');

exports.getRefferNames = async (req, res) => {
  try {
    let data = await User.find().select("name -_id");
    if (!data) {
      return res.status(400).json({ success: true, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.demographic = async (req, res) => {
  let {
    nameTitle,
    fName,
    lName,
    gender,
    dob,
    email,
    phone,
    referredBy,
    country,
    state,
    city,
    zipCode,
    address1,
    address2,
    observation,
  } = req.body;
  let avatar = "";
  if (req.files.length > 0) {
    avatar = req.files[0].filename;
  }
  let newData = new PatientsDemographic({
    nameTitle,
    fName,
    lName,
    gender,
    dob,
    email,
    phone,
    referredBy,
    country,
    state,
    city,
    zipCode,
    address1,
    address2,
    avatar,
    observation,
    createdBy: req.userId,
    updatedBy: req.userId,
    roleId: req.roleId,
    createdBySchoolName: req.createdBySchoolName ? req.createdBySchoolName : "Admin"
  });
  try {
    await newData.validate();
    let { _id } = await newData.save();
    return res.status(201).json({
      success: true,
      message: "Patients Profile is created",
      pId: _id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields",
      });
    }
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
};

exports.getDemographic = async (req, res) => {
  try {
    let data;
    let dataCount;

    if (req.params.id) {
      data = await PatientsDemographic.aggregate([{
        $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.id }] } }
      },
      {
        $addFields: {
          age: {
            $dateDiff:
            {
              startDate: "$dob",
              endDate: new Date(),
              unit: "year"
            }
          },
          dob: '$dob'
        }
      }
      ])
      data = data[0]

    }
    else {
      let pipeline = [
        { $skip: Number(req.query.skip) },
        {
          $addFields: {
            age: {
              $dateDiff:
              {
                startDate: "$dob",
                endDate: new Date(),
                unit: "year"
              }
            },
            dob: { $dateToString: { format: "%Y-%m-%d", date: "$dob" } }
          }
        }
      ];
      // if (Number(req.roleId) !== 1) {
      //   pipeline.push({
      //     $match: {
      //       isDeleted: false,
      //       $and: [
      //         { fName: { "$regex": `${req.query.search}`, "$options": "i" } },
      //         { $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), roleId: req.roleId }, { roleId: 1 }] }
      //       ]
      //     }
      //   })
      // } else {
      //   pipeline.push({ $match: { isDeleted: false, fName: { "$regex": `${req.query.search}`, "$options": "i" } } })
      // }

      // if (Number(req.query.limit) !== 0) {
      //   pipeline.push({ $limit: Number(req.query.limit) });
      // }

      // data = await PatientsDemographic.aggregate(pipeline)
      // dataCount = await PatientsDemographic.find({ fName: { "$regex": `${req.query.search}`, "$options": "i" } }).count();


      if (Number(req.roleId) !== 1) {
        if (!req.query.searchType) {
          pipeline.push({
            $match: {
              isDeleted: false,
              $and: [
                { fName: { "$regex": `${req.query.search}`, "$options": "i" } },
                { $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), roleId: req.roleId }, { roleId: 1 }] }
              ]
            }
          })
        }
        else if (req.query.searchType === "school") {
          pipeline.push({
            $match: {
              isDeleted: false,
              $and: [
                { createdBySchoolName: { "$regex": `${req.query.search}`, "$options": "i" } },
                { $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), roleId: req.roleId }, { roleId: 1 }] }
              ]
            }
          });
        } else if (req.query.searchType === "patient") {
          pipeline.push({
            $match: {
              isDeleted: false,
              $and: [
                { fName: { "$regex": `${req.query.search}`, "$options": "i" } },
                { $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), roleId: req.roleId }, { roleId: 1 }] }
              ]
            }
          });
        }
      } else {
        if (req.query.searchType === "school") {
          pipeline.push({ $match: { isDeleted: false, createdBySchoolName: { "$regex": `${req.query.search}`, "$options": "i" } } });
        } else if (req.query.searchType === "patient") {
          pipeline.push({ $match: { isDeleted: false, fName: { "$regex": `${req.query.search}`, "$options": "i" } } });
        }
      }

      if (Number(req.query.limit) !== 0) {
        pipeline.push({ $limit: Number(req.query.limit) });
      }
      const lookupStage = {
        $lookup: {
          from: "patientdiagnoses",
          localField: "_id", // Change this if your field name is different
          foreignField: "pId", // Change this if your field name is different
          as: "patientdiagnosis"
        }
      };
      pipeline.push(lookupStage);

      data = await PatientsDemographic.aggregate(pipeline);
      dataCount = await PatientsDemographic.find({
        [req.query.searchType === "school" ? "createdBySchoolName" : "fName"]: { "$regex": `${req.query.search}`, "$options": "i" }
      }).count();

    }
    if (!data) {
      return res.status(400).json({ success: true, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", data, dataCount });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
exports.getPatientImage = async (req, res) => {
  try {
    if (!req.params.fileName) {
      return res.status(400).json({ success: true, message: "flie not found" });
    }
    fs.access(`${__dirname}/../../patientAvatar/${req.params.fileName}`, error => {
      if (!error) {
        return fs.createReadStream(`${__dirname}/../../patientAvatar/${req.params.fileName}`).pipe(res);
      } else {
        // The check failed
      }
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateDemographic = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    let {
      nameTitle,
      fName,
      lName,
      gender,
      dob,
      email,
      phone,
      referredBy,
      country,
      state,
      city,
      zipCode,
      address1,
      address2,
      photo,
      observation,
    } = req.body;

    let avatar = "";
    if (req.body.avatar) {
      avatar = req.body.avatar;
    }
    if (req.files.length > 0) {
      avatar = req.files[0].filename;
    }
    // let findData = await PatientsDemographic.findById(req.params.id)
    // if ((req.roleId !== 1 && req.roleId !== findData.roleId) || findData.createdBy.toString() !== req.userId.toString()) {
    //   return res.status(400).json({ success: false, message: "You Don't have Access" });
    // }
    await PatientsDemographic.findByIdAndUpdate(req.params.id, {
      nameTitle,
      fName,
      lName,
      gender,
      dob,
      email,
      phone,
      referredBy,
      country,
      state,
      city,
      zipCode,
      address1,
      address2,
      avatar,
      photo,
      observation,
      // createdBy: req.userId,
      updatedBy: req.userId,
      // roleId: req.roleId
    });

    return res.status(200).json({ success: true, message: "Data is Updated" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields",
      });
    }
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
exports.deleteDemographic = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    await PatientsDemographic.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    let { email } = req.body
    let emailExist = await PatientsDemographic.findOne({ email });
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