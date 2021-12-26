const express = require('express');
const router = express.Router();
const kategorijaControllers = require('../controllers/kategorijaControllers');
//vraca sve kategorije
router.get('/', kategorijaControllers.getAllKategorije);

//vraca samo jednu kategoriju
router.get('/:kategorijaid', kategorijaControllers.getOneKategorija);

//dodaje jedanu kategoriju
router.post('/', kategorijaControllers.addKategorija);

//brisanje kategorije
router.delete('/:kategorijaid', kategorijaControllers.deleteKategorija);

//update kategorije
router.patch('/:kategorijaid', kategorijaControllers.updateKategorija);

module.exports = router;