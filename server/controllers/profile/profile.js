const User = require("../../database/models/user");
const School = require('../../database/models/school')
const Student = require('../../database/models/student');
const mongoose = require("mongoose");
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')
exports.getProfile = async (req, res) => {
    try {
        let user;
        switch (req.roleId) {
            case 1:
                user = await User.findById(req.userId);
                break;
            case 2:
                user = await Student.findById(req.userId);
                break;
            case 3:
                user = await School.findById(req.userId)
                break;
            default:
                return;
        }
        return res.status(200).json({ data: user, success: true, message: '' });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "There is some problem please try again later",
        });

    }

}

exports.updateProfile = async (req, res) => {
    try {
        let user;
        let params = { ...req.body }
        if (req.files.length > 0) {
            params.profilePic = req.files[0].filename
            params.profilePicPath = req.files[0].path
        }
        switch (req.roleId) {
            case 1:
                user = await User.findByIdAndUpdate(req.userId, params, { new: true });
                break;
            case 2:
                await Student.findByIdAndUpdate(
                    req.userId, params,
                    { new: true }
                );
                break;
            case 3:
                await School.findByIdAndUpdate(
                    req.userId,
                    params,
                    { new: true }
                );
                break;
            default:
                return;
        }
        return res.status(200).json({ data: user, success: true, message: 'Profile Updated Successfully' });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "There is some problem please try again later",
        });

    }

}


exports.changePassword = async (req, res) => {
    try {
        let user;
        let isMatch;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match.' });
        }
        switch (req.roleId) {
            case 1:
                user = await User.findById(req.userId);
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found.' });
                }
                isMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Invalid old password.' });
                }
                break;
            case 2:
                user = await Student.findById(req.userId);
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found.' });
                }
                isMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Invalid old password.' });
                }
                break;
            case 3:
                user = await School.findById(req.userId);
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found.' });
                }
                isMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: 'Invalid old password.' });
                }
                break;
            default:
                return;
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ data: user, success: true, message: 'Password updated successfully' });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "There is some problem please try again later",
        });

    }

}


exports.getProfileImage = async (req, res) => {
    try {
      if (!req.params.fileName || req.params.fileName === 'undefined' || req.params.fileName === null) {
        return res.status(400).json({ success: true, message: "flie not found" });
      }
      fs.access(`${__dirname}/../../profilephoto/${req.params.userId}/${req.params.fileName}`, error => {
        if (!error) {
            return fs.createReadStream(`${__dirname}/../../profilephoto/${req.params.userId}/${req.params.fileName}`).pipe(res);
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