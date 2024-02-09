const multer = require('multer');
const fs =require('fs')
const { UploadMedication,UploadfilePath, UploadAssessmentPath, UploadProfilePath, UploadQuickGuide } = require('../config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UploadfilePath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const AssessmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UploadAssessmentPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const ProfileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `${UploadProfilePath}/${req.userId}`
    fs.exists(dir, exist => {
    if (!exist) {
      return fs.mkdir(dir, error => cb(error, dir))
    }
    return cb(null, dir)
  })
    },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const QuickGuideStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `${UploadQuickGuide}/${req.params.id}`
    fs.access(dir, (error) => {
      if (error) {
        return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
      } else {
        return cb(null, dir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const MedicationStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UploadMedication)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})



const upload = multer({ storage: storage });
const uploadAssessmentfile = multer({ storage: AssessmentStorage });
const uploadProfilefile = multer({ storage: ProfileStorage });
const QuickGuidefile = multer({ storage: QuickGuideStorage });
const medicationFile = multer({ storage: MedicationStorage });



exports.uploadMedicationFile = (feildName, fileCount = 1) => {
  return medicationFile.array(feildName, fileCount)
}

exports.uploadAvatarFile = (feildName, fileCount = 1) => {
  return upload.array(feildName, fileCount)
}

exports.uploadAssessment = (feildName, fileCount = 1) => {
  return uploadAssessmentfile.array(feildName, fileCount)
}

exports.uploadProfile = (feildName, fileCount = 1) => {
  return uploadProfilefile.array(feildName, fileCount)
}

exports.uploadQuickGuidefile = (feildName, fileCount = 5) => {
  return QuickGuidefile.array(feildName, fileCount)
}