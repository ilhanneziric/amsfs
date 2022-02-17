const mongoose = require('mongoose');

const tretmanSchema = mongoose.Schema({
    naslov:{
        type: String,
        required: true
    },
    opis: {
        type: String,
        required: false
    },
    cijena: {
        type: Number,
        required: true
    },
    trajanje: {
        type: Number,
        required: true
    },
    kategorija: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Tretman', tretmanSchema);
