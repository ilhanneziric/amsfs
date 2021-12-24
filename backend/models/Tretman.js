const mongoose = require('mongoose');

const tretmanSchema = mongoose.Schema({
    naslov:{
        type: String,
        required: true
    },
    opis: {
        type: String,
        required: true
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kategorija"
    }
}, {timestamps: true});

module.exports = mongoose.model('Tretman', tretmanSchema);
