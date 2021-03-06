const express = require('express');
const router = express.Router();
const mjesecControllers = require('../controllers/mjesecControllers');

//vraca sve mjesece
router.get('/', mjesecControllers.getAllMjeseci);

//vraca samo jedan mjesec
router.get('/:mjesecid', mjesecControllers.getOneMjesec);

//get mjesec sa danom i godinom
router.get('/:broj/:godina', mjesecControllers.getOneMjesecWithBrojAndGodina);

//dodaje jedan mjesec 
router.post('/', mjesecControllers.addMjesec);

//brisanje mjeseca
router.delete('/:mjesecid', mjesecControllers.deleteMjesec);

//update dana
router.patch('/:mjesecid', mjesecControllers.updateMjesec);

module.exports = router;