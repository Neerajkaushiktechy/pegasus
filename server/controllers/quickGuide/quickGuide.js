const quickGuideModal = require('../../database/models/quickGuide');
const fs = require('fs')
exports.addQuickGuide = async (req, res) => {
    try {
        const { categoryName, title, description } = req.body;
        if (!categoryName || !title || !description) {
            return res.status(400).json({
                message: "All input is required",
                success: false
            });
        }

        const saveQuickGide = new quickGuideModal({
            categoryName,
            title,
            description,
            createdBy: req.userId,
            updatedBy: req.userId,
            roleId: req.roleId
        })
        await saveQuickGide.save();
        return res.status(200).json({
            success: true,
            message: "Quick quide created successfully",
            data: saveQuickGide,
        });
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            message: "There is some problem please try again later",
        });
    }
}


exports.getQuickGuide = async (req, res) => {
    try {
        let data;
        let adminGuideData = await quickGuideModal.find({ isDeleted: false, roleId: 1 });
        if (req.roleId === 1) {
            data = await quickGuideModal.find({ isDeleted: false })
        }
        else if (req.roleId === 3) {
            data = await quickGuideModal.find({ isDeleted: false, createdBy: req.userId })
            data = [...data, ...adminGuideData]
        }
        else if (req.roleId === 2) {
            data = await quickGuideModal.find({ isDeleted: false, createdBy: req.createdBy })
            data = [...data, ...adminGuideData]
        }
        if (!data) {
            return res
                .status(400)
                .json({ success: true, message: "Data not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "QuickGuide Fetched successfully", data });
    } catch (error) {
        console.log(error, "err")
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
}

exports.updateQuickGuide = async (req, res) => {
    try {
        if (!req.params.id || req.params.id === undefined) {
            return res
                .status(400)
                .json({ success: false, message: "Id is required" });
        }
        const { categoryName, title, description } = req.body;
        if (!categoryName || !title || !description) {
            return res.status(400).json({
                message: "All input is required",
                success: false
            });
        }
        let document = [];
        if (req.files.length > 0) {
            let file = req.files;
            for (var i = 0; i < file.length; i++) {
                document.push({
                    fileName: file[i].filename,
                    filePath: file[i].path
                })
            }
        }
        document = [...document, ...JSON.parse(req.body.document.replace(/'/g, '"'))]
        await quickGuideModal.findByIdAndUpdate(
            req.params.id,
            {
                categoryName,
                title,
                description,
                file: document,
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Quick quide updated successfully",
            data: {},
        });
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            message: "There is some problem please try again later",
        });
    }
}


exports.deleteQuickGuide = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: true, message: "Data not found" });
        }
        await quickGuideModal.findByIdAndUpdate(req.params.id, { isDeleted: true });
        return res
            .status(200)
            .json({ success: true, message: "Quick quide deleted successfully", });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};


exports.getQuickGudeDocumet = async (req, res) => {
    try {
        if (!req.params.fileName || !req.params.id) {
            return res.status(400).json({ success: true, message: "flie not found" });
        }
        fs.access(`${__dirname}/../../quickGuideFiles/${req.params.id}/${req.params.fileName}`, error => {
            if (!error) {
                return fs.createReadStream(`${__dirname}/../../quickGuideFiles/${req.params.id}/${req.params.fileName}`).pipe(res);
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

exports.addQuickGuideAttachment = async (req, res) => {
    try {
        let document = [];
        if (req.files.length > 0) {
            let file = req.files;
            for (var i = 0; i < file.length; i++) {
                document.push({
                    fileName: file[i].filename,
                    filePath: file[i].path
                })
            }
        }
        await quickGuideModal.findByIdAndUpdate(req.params.id, { file: document });
        return res.status(200).json({
            success: true,
            message: "",
            data: {},
        });

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
}