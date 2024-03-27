const PatientsFamilyHistory = require("../../database/models/patientsFamilyHistory");
const Patientdiagnosis = require("../../database/models/patientDiagnosis");
const PatientAllergies = require("../../database/models/patientAllergies");
const PatientsDemographic = require("../../database/models/patientDemographic");
const PatientsVitals = require('../../database/models/patientVitals')

exports.getAllData = async (req, res) => {
  try {
    let familyHistoryData;
    let diagnosisData;
    let allergiesData;
    let demographicData;
    let vitalData;
    if (req.params.id) {
      [familyHistoryData, diagnosisData, allergiesData, demographicData, vitalData] = await Promise.all([
        PatientsFamilyHistory.find({ pId: req.params.id }),
        Patientdiagnosis.find({ pId: req.params.id }),
        PatientAllergies.find({ pId: req.params.id }),
        PatientsDemographic.aggregate([{
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
            dob: { $dateToString: { format: "%Y-%m-%d", date: "$dob" } }
          }
        }
        ]),
        await PatientsVitals.aggregate([
          { $match: { $expr: { $eq: ['$pId', { $toObjectId: req.params.id }] } } },
          { $addFields: { date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } } }
        ])
      ]);
    } else {
      return res.status(404).json({
        success: false,
        message: "Wrong Path Request",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Data found", "FamilyHistory": familyHistoryData, "Problem": diagnosisData, "Allergies": allergiesData, "Demographic": demographicData[0], "vitalData": vitalData[vitalData.length - 1] });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};


// exports.getVitalData = async (req, res) => {
//   try {
//     const vitalData = await PatientsVitals.findOne({
//       createdBy: req.userId, pId: req.params.id
//     })
//     if (!vitalData) {
//       return res.status(404).json({
//         success: false,
//         data: [],
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: 'Vitals fetched successfully',
//       data: vitalData
//     });
//   } catch (error) {
//     console.error('Error while fetching vitals', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// };

exports.getVitalData = async (req, res) => {
  try {
    const vitalData = await PatientsVitals.findOne(
      { pId: req.params.id }
    )
      .sort({ updatedAt: -1 })
      .limit(1)
      .exec();

    if (!vitalData) {
      return res.status(404).json({
        success: false,
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Vitals fetched successfully',
      data: vitalData,
    });
  } catch (error) {
    console.error('Error while fetching vitals', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


