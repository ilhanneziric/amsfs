const Termin = require('../models/Termin');

const getAllTermine =  async (req,res) => {
    try {
        const termini = await Termin.find();
        res.json(termini);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getAllPTermine =  async (req,res) => {
    try {
        const termini = await Termin.find({isPrihvacen: 'true'});
        res.json(termini);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getAllNTermine =  async (req,res) => {
    try {
        const termini = await Termin.find({isPrihvacen: 'false'});
        res.json(termini);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getOneTermin = async (req,res) => {
    try {
        const termin = await Termin.findById(req.params.terminid);
        res.json(termin);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getAllTerminiInDan = async (req,res) => {
    try {
        const termini = await Termin.find({dan: req.params.danid}).sort({sat:1, minuta:1});
        res.json(termini);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getAllPTerminiInDan = async (req,res) => {
    try {
        const termini = await Termin.find({dan: req.params.danid, isPrihvacen: 'true'}).sort({sat:1, minuta:1});
        res.json(termini);
    } catch (err) {
        res.json({message: err.message});
    }
};

const addTermin = async (req,res) => {
    const noviTermin = new Termin({
        sat: req.body.sat,
        minuta: req.body.minuta,
        ime: req.body.ime,
        telefon: req.body.telefon,
        email: req.body.email,
        napomena: req.body.napomena,
        isPrihvacen: req.body.isPrihvacen,
        dan: req.body.dan,
        tretman: req.body.tretman
    });
    try {
        const savedTermin = await noviTermin.save();
        res.json(savedTermin);
    } catch (err) {
        res.json({message: err.message});
    }
};

const deleteTermin = async (req,res) => {
    try {
        const result = await Termin.deleteOne({_id: req.params.terminid});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

const updateTermin =  async (req,res) => {
    try {
        const result = await Termin.updateOne({_id: req.params.terminid}, { $set: {
            sat: req.body.sat,
            minuta: req.body.minuta,
            ime: req.body.ime,
            telefon: req.body.telefon,
            email: req.body.email,
            napomena: req.body.napomena,
            isPrihvacen: req.body.isPrihvacen,
            dan: req.body.dan,
            tretman: req.body.tretman
        }});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

module.exports = {
    getAllTermine,
    getAllPTermine,
    getAllNTermine,
    getOneTermin,
    getAllTerminiInDan,
    getAllPTerminiInDan,
    addTermin,
    deleteTermin,
    updateTermin
}