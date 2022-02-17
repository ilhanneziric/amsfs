const Tretman = require('../models/Tretman');

const getAllTretmane = async (req,res) => {
    try {
        const tretmani = await Tretman.find();
        res.json(tretmani);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getOneTretman = async (req,res) => {
    try {
        const tretman = await Tretman.findById(req.params.tretmanid);
        res.json(tretman);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getAllTretmaniInKategorija = async (req,res) => {
    try {
        const tretmani = await Tretman.find({kategorija: req.params.kategorijaid});
        res.json(tretmani);
    } catch (err) {
        res.json({message: err.message});
    }
};

const addTretman = async (req,res) => {
    const noviTretman = new Tretman({
        naslov: req.body.naslov,
        opis: req.body.opis,
        cijena: req.body.cijena,
        trajanje: req.body.trajanje,
        kategorija: req.body.kategorija
    });
    try {
        const savedTretman = await noviTretman.save();
        res.json(savedTretman);
    } catch (err) {
        res.json({message: err.message});
    }
};

const deleteTretman = async (req,res) => {
    try {
        const result = await Tretman.deleteOne({_id: req.params.tretmanid});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

const updateTretman = async (req,res) => {
    try {
        const result = await Tretman.updateOne({_id: req.params.tretmanid}, { $set: {
            naslov: req.body.naslov,
            opis: req.body.opis,
            cijena: req.body.cijena,
            trajanje: req.body.trajanje,
            kategorija: req.body.kategorija
        }});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

module.exports = {
    getAllTretmane,
    getOneTretman,
    getAllTretmaniInKategorija,
    addTretman,
    deleteTretman,
    updateTretman
}