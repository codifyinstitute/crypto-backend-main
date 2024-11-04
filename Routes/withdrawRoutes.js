const express = require('express');
const {
    createWithdraw,
    getAllWithdraws,
    getWithdrawById,
    updateWithdraw,
    deleteWithdraw,
    getAllByEmailWithdraws,
    Reject
} = require('../Controllers/withdrawController'); // Adjust the path as needed

const router = express.Router();

// Create a new withdrawal
router.post('/add', createWithdraw);

// Get all withdrawals
router.get('/all', getAllWithdraws);

// Get withdrawal by ID
router.get('/get/:id', getWithdrawById);
router.get('/get/email/:email', getAllByEmailWithdraws);

// Update withdrawal by ID
router.put('/update/:id', updateWithdraw);
router.put('/reject/:id', Reject);

// Delete withdrawal by ID
router.delete('/delete/:id', deleteWithdraw);

module.exports = router;
