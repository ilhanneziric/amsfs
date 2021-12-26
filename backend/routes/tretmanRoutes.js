const express = require('express');
const router = express.Router();
const tretmanControllers = require('../controllers/tretmanControllers');

//vraca sve tretmane
router.get('/', tretmanControllers.getAllTretmane);

//vraca samo jedan tretman
router.get('/:tretmanid', tretmanControllers.getOneTretman);

//vraca tretmane u datoj kategoriji
router.get('/kategorija/:kategorijaid', tretmanControllers.getAllTretmaniInKategorija);

//dodaje jedan tretman 
router.post('/', tretmanControllers.addTretman);

//brisanje tretmana
router.delete('/:tretmanid', tretmanControllers.deleteTretman);

//update tertmana
router.patch('/:tretmanid', tretmanControllers.updateTretman);

module.exports = router;