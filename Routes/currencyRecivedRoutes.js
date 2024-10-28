const express = require('express');
const router = express.Router();
const currencyController = require('../Controllers/currencyRecivedController');

// Add currency
router.post('/add', currencyController.addCurrency);

// Get all currencies
router.get('/all', currencyController.getAllCurrencies);

// Get currency by ID
router.get('/get/:id', currencyController.getCurrencyById);

// Update currency by ID
router.put('/update/:id', currencyController.updateCurrency);

// Delete currency by ID
router.delete('/delete/:id', currencyController.deleteCurrency);

module.exports = router;
