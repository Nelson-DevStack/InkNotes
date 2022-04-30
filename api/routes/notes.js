const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/notes', notesController.getAll);
router.get('/note/:id', notesController.findbyId);
router.post('/note', notesController.post);
router.put('/note', notesController.update);
router.delete('/note/:id', notesController.delete);

module.exports = router;