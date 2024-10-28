const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../Controllers/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Signup and send OTP
router.post('/signup', userController.signup);

// Verify OTP and complete signup
router.post('/signup/verify', userController.verifyOTP);

// Login and send OTP
router.post('/login', userController.login);

// Verify OTP and complete login
router.post('/login/verify', userController.verifyLoginOTP);

// Route to get all users
router.get('/all', userController.getAllUsers);

// Route to get a specific user by ID
router.get('/get/:emailId', userController.getUserById);

// Route to add or update an account for a user
router.put('/put/:emailId/accounts', userController.addOrUpdateAccount);

// Route to delete an account from a user
router.delete('/del/:emailId/accounts/:accountNumber', userController.deleteAccount);

// Route to delete a user by ID
router.delete('/del/:emailId', userController.deleteUser);

// Route to update profile picture
router.put('/update/:email', upload.single('profilePicture'), userController.updateProfilePicture);

module.exports = router;
