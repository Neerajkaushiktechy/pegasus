const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    diseaseName : {
        type : String,
        trim: true
    },
},{ timestamps: true });

let Disease = mongoose.model("disease",schema);
module.exports = Disease;