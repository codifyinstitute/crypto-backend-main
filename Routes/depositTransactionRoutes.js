const express = require('express');
const router = express.Router();
const depositTransactionController = require('../Controllers/depositTransactionController');

// Add deposit transaction
router.post('/add', depositTransactionController.addDepositTransaction);

// Get all deposit transactions
router.get('/all', depositTransactionController.getAllDepositTransactions);

// Get deposit transaction by ID
router.get('/get/:id', depositTransactionController.getDepositTransactionById);


// for getting all user deposit history
router.get('/get/email/:Email',depositTransactionController.getDepositTransactionByEmail)


// Update deposit transaction by ID
router.put('/update/:id', depositTransactionController.updateDepositTransaction);

// Delete deposit transaction by ID
router.delete('/delete/:id', depositTransactionController.deleteDepositTransaction);

module.exports = router;
