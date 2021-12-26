const express = require('express');
const router = express.Router();
const terminControllers = require('../controllers/terminControllers');

//vraca sve termine
router.get('/', terminControllers.getAllTermine);

//vraca samo jedan termin
router.get('/:terminid', terminControllers.getOneTermin);

//vraca termine u datom danu
router.get('/dan/:danid', terminControllers.getAllTerminiInDan);

//dodaje jedan termin 
router.post('/', terminControllers.addTermin);

//brisanje termina
router.delete('/:terminid', terminControllers.deleteTermin);

//update termina
router.patch('/:terminid', terminControllers.updateTermin);

module.exports = router;