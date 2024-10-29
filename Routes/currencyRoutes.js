const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const currencyController = require('../Controllers/currencyController');
const usaCurencyController = require('../Controllers/usaCurencyController');
const euroCurrnecyController = require('../Controllers/euroCurrnecyController');
const ukCurrencyController = require('../Controllers/ukCurrencyController');
const blrCurrncyController = require('../Controllers/blrCurrncyController');
const aedCurrncyController = require('../Controllers/aedCurrncyController');





// Route to add a new currency
router.post('/india/add', upload, currencyController.addCurrency);

// Route to get all currencies
router.get('/india/all', currencyController.getAllCurrencies);

// Route to get a currency by ID
router.get('/india/get/:id', currencyController.getCurrencyById);

// Route to update a currency by ID
router.put('/india/put/:id', upload, currencyController.updateCurrency);

// Route to delete a currency by ID
router.delete('/india/del/:id', currencyController.deleteCurrency);



// usa
router.post('/usa/add', upload, usaCurencyController.addCurrency);

// Route to get all currencies
router.get('/usa/all', usaCurencyController.getAllCurrencies);

// Route to get a currency by ID
router.get('/usa/get/:id', usaCurencyController.getCurrencyById);

// Route to update a currency by ID
router.put('/usa/put/:id', upload, usaCurencyController.updateCurrency);

// Route to delete a currency by ID
router.delete('/usa/del/:id', usaCurencyController.deleteCurrency);


// euro
router.post('/euro/add', upload, euroCurrnecyController.addCurrency);
// Route to get all currencies
router.get('/euro/all', euroCurrnecyController.getAllCurrencies);
// Route to get a currency by ID
router.get('/euro/get/:id', euroCurrnecyController.getCurrencyById);
// Route to update a currency by ID
router.put('/euro/put/:id', upload, euroCurrnecyController.updateCurrency);
// Route to delete a currency by ID
router.delete('/euro/del/:id', euroCurrnecyController.deleteCurrency);


// unitekingdom
router.post('/uk/add', upload, ukCurrencyController.addCurrency);
// Route to get all currencies
router.get('/uk/all', ukCurrencyController.getAllCurrencies);
// Route to get a currency by ID
router.get('/uk/get/:id', ukCurrencyController.getCurrencyById);
// Route to update a currency by ID
router.put('/uk/put/:id', upload, ukCurrencyController.updateCurrency);
// Route to delete a currency by ID
router.delete('/uk/del/:id', ukCurrencyController.deleteCurrency);


// blr
router.post('/brl/add', upload, blrCurrncyController.addCurrency);
// Route to get all currencies
router.get('/brl/all', blrCurrncyController.getAllCurrencies);
// Route to get a currency by ID
router.get('/brl/get/:id', blrCurrncyController.getCurrencyById);
// Route to update a currency by ID
router.put('/brl/put/:id', upload, blrCurrncyController.updateCurrency);
// Route to delete a currency by ID
router.delete('/brl/del/:id', blrCurrncyController.deleteCurrency);


// aed
router.post('/aed/add', upload, aedCurrncyController.addCurrency);
// Route to get all currencies
router.get('/aed/all', aedCurrncyController.getAllCurrencies);
// Route to get a currency by ID
router.get('/aed/get/:id', aedCurrncyController.getCurrencyById);
// Route to update a currency by ID
router.put('/aed/put/:id', upload, aedCurrncyController.updateCurrency);
// Route to delete a currency by ID
router.delete('/aed/del/:id', aedCurrncyController.deleteCurrency);





module.exports = router;
