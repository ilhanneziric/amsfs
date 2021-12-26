const Kategorija = require('../models/Kategorija');

const getAllKategorije = async (req,res) => {
    try {
        const kategorije = await Kategorija.find();
        res.json(kategorije);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getOneKategorija = async (req,res) => {
    try {
        const kategorija = await Kategorija.findById(req.params.kategorijaid);
        res.json(kategorija);
    } catch (err) {
        res.json({message: err.message});
    }
};

const addKategorija = async (req,res) => {
    const novaKategorija = new Kategorija({
        naziv: req.body.naziv,
        spol: req.body.spol
    });
    try {
        const savedKategorija = await novaKategorija.save();
        res.json(savedKategorija);
    } catch (err) {
        res.json({message: err.message});
    }
};

const deleteKategorija = async (req,res) => {
    try {
        const result = await Kategorija.deleteOne({_id: req.params.kategorijaid});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

const updateKategorija = async (req,res) => {
    try {
        const result = await Kategorija.updateOne({_id: req.params.kategorijaid}, { $set: {
            naziv: req.body.naziv,
            spol: req.body.spol
        }});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

module.exports = {
    getAllKategorije,
    getOneKategorija,
    addKategorija,
    deleteKategorija,
    updateKategorija
}