const express = require('express');
const {
    createOrUpdateWallet,
    getAllWallets,
    getWalletByEmail,
    updateWalletByEmail,
    deleteWalletByEmail,
} = require('../Controllers/walletController'); // Adjust the path as needed

const router = express.Router();

// Create or update a wallet
router.post('/add', createOrUpdateWallet);

// Get all wallets
router.get('/all', getAllWallets);

// Get wallet by Email
router.get('/get/:email', getWalletByEmail);

// Update wallet by Email
router.put('/:email', updateWalletByEmail);

// Delete wallet by Email
router.delete('/:email', deleteWalletByEmail);

module.exports = router;
