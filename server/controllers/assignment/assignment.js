const mongoose = require('mongoose');
const Assignment = require("../../database/models/assignment");
const StudentAssignmentStatus = require("../../database/models/studentAssignmentStatus");
const AssessmentGroup = require("../../database/models/assessmentGroup");
const notificationController = require('../../utils/notification');
exports.postAssignment = async (req, res) => {
  let {
    assessmentToolList = [],
    assessmentGroupList = [],
    assessmentType,
    department,
    students,
    patient,
    endDate
  } = req.body;

  if (assessmentType === "List") {
    if (assessmentToolList.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Please Select at least one Assessment",
      });
    }
  } else {
    if (assessmentGroupList.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Please Select at least one Assessment",
      });
    }
  }
  let newData = new Assignment({
    assessmentToolList,
    assessmentGroupList,
    assessmentType,
    department,
    students,
    patient,
    endDate,
    createdBy: req.userId,
    roleId: req.roleId,
  });
  try {
    await newData.validate();
    await newData.save();
    if (assessmentType === "List") {
      for (var i = 0; i < newData?.assessmentToolList.length; i++) {
        for (var j = 0; j < newData.students.length; j++) {
          //send notification to student
          await notificationController.notificationService(newData.students[j], newData._id, newData?.assessmentToolList[i], req)
          let savedAssignment = await new StudentAssignmentStatus({
            type: "List",
            studentId: newData.students[j],
            assessmentId: newData?.assessmentToolList[i],
            // assignmentId : mongoose.Schema.Types.ObjectId(newData._id)
            assignmentId: newData._id,
            patient: patient,
            createdBy: req.userId,
            endDate: endDate
          })
          await savedAssignment.save()
        }
      }
    }
    else if (assessmentType === "Group") {
      const groupList = await AssessmentGroup.find({ _id: { $in: newData?.assessmentGroupList } })
      for (var i = 0; i < groupList.length; i++) {
        for (var k = 0; k < groupList[i]?.assessmentList.length; k++)
          for (var j = 0; j < newData.students.length; j++) {
            for (var l = 0; l < newData.assessmentGroupList.length; l++) {
              //send notification to student
              await notificationController.notificationService(newData.students[j], newData._id, groupList[i]?.assessmentList[k], req)
              let savedAssignment = await new StudentAssignmentStatus({
                type: "Group",
                studentId: newData.students[j],
                assessmentId: groupList[i]?.assessmentList[k],
                // assignmentId :mongoose.Schema.Types.ObjectId(newData._id)
                assessmentGroupId: newData.assessmentGroupList[l],
                assignmentId: newData._id,
                patient: patient,
                createdBy: req.userId,
                endDate: endDate
              })
              await savedAssignment.save()
            }
          }
      }
    }
    //send notification to student
    for (var i = 0; i < newData.students.length; i++) {
      await notificationController.notificationService(newData.students[i], newData._id, req)
    }

    return res.status(201).json({
      success: true,
      message: "Assignment is created"
    });
  } catch (err) {
    console.log(err)
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

// exports.getAssignment = async (req, res) => {
//   const pageNmuber = parseInt(req.query.pageNumber) || 1
//   const limit = parseInt(req.query.limit) || 5;
//   const skip_no = parseInt(pageNmuber - 1) * limit;
//   let matchCondition = {
//     isDeleted: false
//   };

//   if (req.roleId === 1) {
//     matchCondition = {
//       isDeleted: false
//     };
//   } else if (req.roleId === 3) {
//     matchCondition = {
//       createdBy: new mongoose.Types.ObjectId(req.userId),
//       isDeleted: false
//     };
//   }
//   try {
//     let countDocuments = await Assignment.countDocuments(matchCondition);
//     let data = await Assignment.aggregate([{
//       $match: matchCondition
//     },
//     {
//       $lookup: {
//         from: "assessmenttools",
//         let: { assessmentToolList: "$assessmentToolList" },
//         pipeline: [
//           {
//             $match: {
//               $expr: { $in: [{ $toString: "$_id" }, "$$assessmentToolList"] }
//             }
//           }
//         ],
//         as: "assessmentToolList"
//       }
//     },
//     {
//       $match: {
//         $or: [
//           matchCondition,
//           { "assessmentToolList": { $exists: false } }
//         ]
//       }
//     },
//     {
//       $lookup: {
//         from: "assessmentgroups",
//         let: { assessmentGroupList: "$assessmentGroupList" },
//         pipeline: [
//           {
//             $match: {
//               $expr: { $in: [{ $toString: "$_id" }, "$$assessmentGroupList"] }
//             }
//           }
//         ],
//         as: "assessmentGroupList"
//       }
//     },
//     {
//       $match: {
//         $or: [
//           // { "assessmentGroupList.isDeleted": false },
//           // { "assessmentGroupList.isDeleted": null },
//           matchCondition,
//           { "assessmentGroupList": { $exists: false } }
//         ]
//       }
//     },

//     {
//       $lookup: {
//         from: "students",
//         let: { students: "$students" },
//         pipeline: [
//           {
//             $match: {
//               $expr: { $in: [{ $toString: "$_id" }, "$$students"] }
//             }
//           }
//         ],
//         as: "students"
//       }
//     },
//     {
//       $addFields: {
//         createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
//       }
//     },
//     { $sort: { createdAt: -1 } },
//     { $skip: skip_no },
//     { $limit: limit }
//     ])
//     if (!data) {
//       return res.status(400).json({ success: true, message: "Data not found" });
//     }

//     // // const countDocuments = data.length;
//     // console.log(countDocuments, "dococunt")
//     return res.status(200).json({
//       success: true, message: "Data found", data, totalCount: countDocuments,
//       totalPages: Math.ceil(countDocuments / limit)
//     });
//   } catch (error) {
//     console.log(error)
//     return res.status(400).json({
//       success: false,
//       message: "There is some error please try again later",
//     });
//   }
// };


exports.getAssignment = async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1
  const limit = parseInt(req.query.limit) || 20;
  const skip_no = parseInt(pageNumber - 1) * limit;
  let matchCondition = {
    isDeleted: false
  };

  if (req.roleId === 1) {
    matchCondition = {
      isDeleted: false
    };
  } else if (req.roleId === 3) {
    matchCondition = {
      createdBy: new mongoose.Types.ObjectId(req.userId),
      isDeleted: false
    };
  }
  try {
    let countDocuments = await Assignment.countDocuments(matchCondition);
    let data = await Assignment.aggregate([{
      $match: matchCondition
    },
    {
      $lookup: {
        from: "assessmenttools",
        let: { assessmentToolList: "$assessmentToolList" },
        pipeline: [
          {
            $match: {
              $expr: { $in: [{ $toString: "$_id" }, "$$assessmentToolList"] }
            }
          }
        ],
        as: "assessmentToolList"
      }
    },
    {
      $match: {
        $or: [
          matchCondition,
          { "assessmentToolList": { $exists: false } }
        ]
      }
    },
    {
      $lookup: {
        from: "assessmentgroups",
        let: { assessmentGroupList: "$assessmentGroupList" },
        pipeline: [
          {
            $match: {
              $expr: { $in: [{ $toString: "$_id" }, "$$assessmentGroupList"] }
            }
          }
        ],
        as: "assessmentGroupList"
      }
    },
    {
      $match: {
        $or: [
          // { "assessmentGroupList.isDeleted": false },
          // { "assessmentGroupList.isDeleted": null },
          matchCondition,
          { "assessmentGroupList": { $exists: false } }
        ]
      }
    },

    {
      $lookup: {
        from: "students",
        let: { students: "$students" },
        pipeline: [
          {
            $match: {
              $expr: { $in: [{ $toString: "$_id" }, "$$students"] }
            }
          },
        ],
        as: "students"
      }
    },
    {
      $addFields: {
        createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip_no },
    { $limit: limit },
    ...(req.query.searchType === "student" && req.query.searchText
      ? [
        {
          $match: {
            "students.fName": {
              $regex: req.query.searchText,
              $options: "i"
            }
          }
        }
      ]
      : []),
    ...(req.query.searchType === "assesment" && req.query.searchText
      ? [
        {
          $match: {
            "assessmentToolList.assessmentTitle": {
              $regex: req.query.searchText,
              $options: "i"
            }
          }
        }
      ]
      : [])

    ])
    if (!data) {
      return res.status(400).json({ success: true, message: "Data not found" });
    }

    // // const countDocuments = data.length;
    // console.log(countDocuments, "dococunt")
    return res.status(200).json({
      success: true, message: "Data found", data, totalCount: countDocuments,
      totalPages: Math.ceil(countDocuments / limit)
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    let {
      assessmentToolList,
      assessmentGroupList,
      assessmentType,
      department,
      students,
      patient,
      endDate
    } = req.body;
    if (assessmentType === "List") {
      if (assessmentToolList.length < 1) {
        return res.status(400).json({
          success: false,
          message: "Please Select at least one Assessment",
        });
      }
    } else {
      if (assessmentGroupList.length < 1) {
        return res.status(400).json({
          success: false,
          message: "Please Select at least one Assessment",
        });
      }
    }
    await Assignment.findByIdAndUpdate(req.params.id, {
      assessmentToolList,
      assessmentGroupList,
      assessmentType,
      department,
      students,
      patient,
      endDate
    });
    return res.status(200).json({ success: true, message: "Data is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
exports.deleteAssignment = async (req, res) => {
  const assignmentId = new mongoose.Types.ObjectId(req.params.id);
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    await Assignment.findByIdAndUpdate(req.params.id, { isDeleted: true });
    await StudentAssignmentStatus.updateMany({ assignmentId: req.params.id }, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    console.log(error, "err")
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};