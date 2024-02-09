const FamilyHistoryType = require("../../database/models/familyHistoryTypes");

exports.addFamilyHistoryType = async (req, res) => {
  try {
    await FamilyHistoryType.insertMany(req.body);

    return res
      .status(201)
      .json({ success: true, message: "Family history Created successfully" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "There is some error please try again later",
    })
  }
}


exports.getFamilyHistoryType = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await FamilyHistoryType.findById({ _id: req.params.id }).collation({ locale: "en" }).sort({ name: 1 });
    } else {
      if (req.roleId === 1) {

        data = await FamilyHistoryType.find({}).collation({ locale: "en" }).sort({ name: 1 });
      }
      else {
        data = await FamilyHistoryType.find({
          $or: [
            { createdBy: req.userId },
            { roleId: "1" },
            { createdBy: { $exists: false } },
          ],
        }).collation({ locale: "en" }).sort({ name: 1 });
      }
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "FamilyHistory not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};