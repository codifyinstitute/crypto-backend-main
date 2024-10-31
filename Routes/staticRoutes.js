const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const staticController = require('../Controllers/staticController');
const usaStaticController = require('../Controllers/usaStaticController');
const euroStaticController = require('../Controllers/euroStaticController');
const ukStaticController = require('../Controllers/ukStaticController');
const brlStaticController = require('../Controllers/brlStaticController');
const aedStaticController = require('../Controllers/aedStaticController');



// Route to add a new static data entry
router.post('/india/add', staticController.addStaticData);

// Route to get all static data entries
router.get('/india/all', staticController.getAllStaticData);

// Login a user
router.post('/india/login', staticController.loginUser);

// Route to get a specific static data entry by ID
router.get('/india/get/:id', staticController.getStaticDataById);

// Route to update a static data entry by ID
router.put('/india/put/:id', staticController.updateStaticData);

// Route to delete a static data entry by ID
router.delete('/india/del/:id', staticController.deleteStaticData);
router.get('/india/one', staticController.getOneStaticData);

// Route to add a new usa-based data entry
router.post('/usa/add', usaStaticController.addStaticData);
router.get('/usa/all', usaStaticController.getAllStaticData);
router.get('/usa/one', usaStaticController.getOneStaticData);
router.post('/usa/login', usaStaticController.loginUser);
router.get('/usa/get/:id', usaStaticController.getStaticDataById);
router.put('/usa/put/:id', usaStaticController.updateStaticData);
router.delete('/usa/del/:id', usaStaticController.deleteStaticData);

// Route to add a new euro-base data entry
router.post('/euro/add', euroStaticController.addStaticData);
router.get('/euro/all', euroStaticController.getAllStaticData);
router.get('/euro/one', euroStaticController.getOneStaticData);
router.post('/euro/login', euroStaticController.loginUser);
router.get('/euro/get/:id', euroStaticController.getStaticDataById);
router.put('/euro/put/:id', euroStaticController.updateStaticData);
router.delete('/euro/del/:id', euroStaticController.deleteStaticData);

// Route to add a new uk-based data entry
router.post('/uk/add', ukStaticController.addStaticData);
router.get('/uk/all', ukStaticController.getAllStaticData);
router.get('/uk/one', ukStaticController.getOneStaticData);
router.post('/uk/login', ukStaticController.loginUser);
router.get('/uk/get/:id', ukStaticController.getStaticDataById);
router.put('/uk/put/:id', ukStaticController.updateStaticData);
router.delete('/uk/del/:id', ukStaticController.deleteStaticData);

// Route to add a new brl-based data entry
router.post('/brl/add', brlStaticController.addStaticData);
router.get('/brl/all', brlStaticController.getAllStaticData);
router.get('/brl/one', brlStaticController.getOneStaticData);
router.post('/brl/login', brlStaticController.loginUser);
router.get('/brl/get/:id', brlStaticController.getStaticDataById);
router.put('/brl/put/:id', brlStaticController.updateStaticData);
router.delete('/brl/del/:id', brlStaticController.deleteStaticData);

// Route to add a new usa data entry
router.post('/aed/add', aedStaticController.addStaticData);
router.get('/aed/all', aedStaticController.getAllStaticData);
router.get('/aed/one', aedStaticController.getOneStaticData);
router.post('/aed/login', aedStaticController.loginUser);
router.get('/aed/get/:id', aedStaticController.getStaticDataById);
router.put('/aed/put/:id', aedStaticController.updateStaticData);
router.delete('/aed/del/:id', aedStaticController.deleteStaticData);

module.exports = router;
