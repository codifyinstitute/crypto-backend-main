const express = require('express');
const router = express.Router();
const contactController = require('../Controllers/contactController');

// Route to add a new contact
router.post('/add', contactController.addContact);

// Route to get all contacts
router.get('/all', contactController.getContacts);

// Route to delete a contact by ID
router.delete('/delete/:id', contactController.deleteContact);

// Route to update contact status by ID
router.patch('/update/:id/status', contactController.updateStatus);

module.exports = router;
