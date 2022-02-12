const { aggregate } = require('../models/Dan');
const Dan = require('../models/Dan');

const getAllDani = async (req,res) => {
    try {
        const dani = await Dan.find();
        res.json(dani);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getAllDaniWithTermin = async (req,res) => {
    try {
        const dani = await Dan.aggregate([
            { $lookup:
                {
                    from: 'termins',
                    localField: '_id',
                    foreignField: 'dan',
                    as: 'termini'
                }
            }
        ]);
        res.json(dani);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getOneDay =  async (req,res) => {
    try {
        const dan = await Dan.findById(req.params.danid);
        res.json(dan);
    } catch (err) {
        res.json({message: err.message});
    }
};

const getAllDaneInMjesec = async (req,res) => {
    try {
        const dani2 = await Dan.aggregate([
            { $lookup:
                {
                    from: 'termins',
                    localField: '_id',
                    foreignField: 'dan',
                    as: 'termini'
                }
            }
        ]);
        res.json(dani2.filter(dan => dan.mjesec.toString() == req.params.mjesecid));
    } catch (err) {
        res.json({message: err.message});
    }
};

const addDan = async (req,res) => {
    const noviDan = new Dan({
        broj: req.body.broj,
        disabled: req.body.disabled,
        mjesec: req.body.mjesec
    });
    try {
        const savedDan = await noviDan.save();
        res.json(savedDan);
    } catch (err) {
        res.json({message: err.message});
    }
};

const deleteDan = async (req,res) => {
    try {
        const result = await Dan.deleteOne({_id: req.params.danid});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

const updateDan = async (req,res) => {
    try {
        const result = await Dan.updateOne({_id: req.params.danid}, { $set: {
            broj: req.body.broj,
            disabled: req.body.disabled,
            mjesec: req.body.mjesec
        }});
        res.json(result);
    } catch (err) {
        res.json({message: err.message});
    }
};

module.exports = {
    getAllDani,
    getAllDaniWithTermin,
    getOneDay,
    getAllDaneInMjesec,
    addDan,
    deleteDan,
    updateDan
}