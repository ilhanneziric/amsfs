const Mjesec = require('../models/Mjesec');

const getAllMjeseci = async (req,res) => {
    try {
        const mjeseci = await Mjesec.find();
        res.json(mjeseci);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getOneMjesec = async (req,res) => {
    try {
        const mjesec = await Mjesec.findById(req.params.mjesecid);
        res.json(mjesec);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getOneMjesecWithBrojAndGodina = async (req,res) => {
    try {
        let mjesec = await Mjesec.findOne({broj: req.params.broj, godina: req.params.godina});
        res.json(mjesec == null ? "nema" : mjesec);
    } catch (err) {
        res.json({message: err.message});
    }
};

const addMjesec = async (req,res) => {
    const noviMjesec = new Mjesec({
        broj: req.body.broj,
        godina: req.body.godina,
        pocetniDan : req.body.pocetniDan
    });
    try {
        const savedMjesec = await noviMjesec.save();
        res.json(savedMjesec);
    } catch (err) {
        res.json({message: err.message});
    }
};

const deleteMjesec = async (req,res) => {
    try {
        const result = await Mjesec.deleteOne({_id: req.params.mjesecid});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

const updateMjesec = async (req,res) => {
    try {
        const result = await Mjesec.updateOne({_id: req.params.mjesecid}, { $set: {
            broj: req.body.broj,
            godina: req.body.godina,
            pocetniDan: req.body.pocetniDan
        }});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

module.exports = {
    getAllMjeseci,
    getOneMjesec,
    getOneMjesecWithBrojAndGodina,
    addMjesec,
    deleteMjesec,
    updateMjesec
}