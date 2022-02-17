const express = require('express');
const router = express.Router();
const danControllers = require('../controllers/danControllers');

//vraca sve dane
router.get('/', danControllers.getAllDani);

//vraca sve dane sa terminima
router.get('/termin', danControllers.getAllDaniWithTermin);

//vraca samo jedan dan
router.get('/:danid', danControllers.getOneDay);

//vraca dane u datom mjesecu
router.get('/mjesec/:mjesecid', danControllers.getAllDaneInMjesec);

//dodaje jedan dan 
router.post('/', danControllers.addDan);

//brisanje dana
router.delete('/:danid', danControllers.deleteDan);

//update dana
router.patch('/:danid', danControllers.updateDan);

module.exports = router;