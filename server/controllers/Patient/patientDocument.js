const PatientDocument = require("../../database/models/patientDocument");
const DocumentType = require("../../database/models/doumentType");

exports.addDocument = async (req, res) => {
  let file
  if (req.files.length > 0) {
    file = req.files[0].filename
  }
  let {
    pId, name, date, documentType, provider, notes, submittedTime, assignmentId
  } = req.body;
  let newData = new PatientDocument({
    file: file,
    pId,
    name,
    date,
    documentType,
    provider,
    notes,
    createdBy: req.userId,
    updatedBy: req.userId,
    roleId: req.roleId,
    submittedTime,
    assignmentId
  });
  try {
    await newData.save();
    return res
      .status(201)
      .json({ success: true, message: "Document Data Saved" });
  } catch (err) {
    console.log("Validation", err);
    return res
      .status(400)
      .json({ success: false, message: "All Feild is required" });
  }
};

exports.getDocument = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await PatientDocument.find({ pId: req.params.id, isDeleted: false }).populate("documentType");
      console.log(data, "data")
    } else {
      data = await PatientDocument.find({ isDeleted: false });
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "Document not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Document found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    await PatientDocument.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Document not found" });
    }
    let {
      pId, name, date, documentType, provider, notes
    } = req.body;

    let file
    if (req.files.length > 0) {
      file = req.files[0].filename
    }
    await PatientDocument.findByIdAndUpdate(req.params.id, {
      pId, name, date, documentType, provider, notes, file,
      createdBy: req.userId,
      updatedBy: req.userId,
      roleId: req.roleId
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

exports.getDocumentType = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await DocumentType.findById(req.params.id).collation({ locale: "en" }).sort({ documentType: 1 });
    } else {
      if (req.roleId === 1) {
        data = await DocumentType.find().collation({ locale: "en" }).sort({ documentType: 1 });
      }
      else {
        data = await DocumentType.find({
          $or: [
            { createdBy: req.userId },
            { roleId: "1" },
            { createdBy: { $exists: false } },
          ],
        }).collation({ locale: "en" }).sort({ documentType: 1 });
      }
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "DocumentType not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "DocumentType found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.getDocumentFiles = async (req, res) => {
  try {
    if (!req.params.fileName) {
      return res.status(400).json({ success: true, message: "flie not found" });
    }
    const file = `${__dirname}/../../patientsDocuments/${req.params.fileName}`;
    return res.download(file);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};



