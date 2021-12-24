const mongoose = require('mongoose');

const mjesecSchema = mongoose.Schema({
    broj: {
        type: Number,
        required: true
    },
    pocetniDan: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Mjesec', mjesecSchema);