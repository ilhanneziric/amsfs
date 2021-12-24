const mongoose = require('mongoose');

const kategorijaSchema = mongoose.Schema({
    naziv:{
        type: String,
        required: true
    },
    spol: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Kategorija', kategorijaSchema);
