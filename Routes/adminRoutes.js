const express = require('express');
const {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginUser
} = require('../Controllers/adminController'); // Adjust the path as needed

const router = express.Router();

// Create a new admin
router.post('/add', createAdmin);

router.post('/login', loginUser);

// Get all admins
router.get('/all', getAllAdmins);

// Get admin by ID
router.get('/get/:id', getAdminById);

// Update admin by ID
router.put('/update/:id', updateAdmin);

// Delete admin by ID
router.delete('/delete/:id', deleteAdmin);

module.exports = router;
