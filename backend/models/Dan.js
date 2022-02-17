const mongoose = require('mongoose');

const danSchema = mongoose.Schema({
    broj:{
        type: Number,
        required: true
    },
    disabled: {
        type: String,
        required: true
    },
    mjesec: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mjesec"
    }
}, {timestamps: true});

module.exports = mongoose.model('Dan', danSchema);
