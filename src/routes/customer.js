const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

//--
router.get('/', customerController.list);

router.get('/artecocinayamor2', customerController.eventC);
router.get('/testcocina', customerController.test);
router.post('/add', customerController.save);


router.get('/delete/:id', customerController.delete);

//mostrarDB
router.get('/kpTudhjif03sdfjkdsfdfkjTwBhj2dfhgjfddfg975dfs456DG5456etgADdgPQfdf', customerController.mostrarDBViews);

//landing streaming --
router.get('/streamingArteCocinayAmor2', customerController.stream);



module.exports = router;