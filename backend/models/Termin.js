const mongoose = require('mongoose');

const terminSchema = mongoose.Schema({
    sat:{
        type: Number,
        required: true
    },
    minuta: {
        type: Number,
        required: true
    },
    ime: {
        type: String,
        required: true
    },
    telefon: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isPrihvacen: {
        type: String,
        required: true
    },
    dan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dan"
    },
    tretman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tretman"
    }
}, {timestamps: true});

module.exports = mongoose.model('Termin', terminSchema);
