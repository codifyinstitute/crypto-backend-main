const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const staticController = require('../Controllers/staticController');

// Route to add a new static data entry
router.post('/add', staticController.addStaticData);

// Route to get all static data entries
router.get('/all', staticController.getAllStaticData);

// Login a user
router.post('/login', staticController.loginUser);

// Route to get a specific static data entry by ID
router.get('/get/:id', staticController.getStaticDataById);

// Route to update a static data entry by ID
router.put('/put/:id', staticController.updateStaticData);

// Route to delete a static data entry by ID
router.delete('/del/:id', staticController.deleteStaticData);

module.exports = router;
