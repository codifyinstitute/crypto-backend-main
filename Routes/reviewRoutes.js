const express = require('express');
const router = express.Router();
const multer = require('multer');
const reviewController = require('../Controllers/reviewController'); // Adjust the path as needed

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});
const upload = multer({ storage });

// Route to add a review
router.post('/add', upload.single('Image'), reviewController.addReview);

// Route to get all reviews
router.get('/all', reviewController.getAllReviews);

// Route to get a review by ID
router.get('/get/:id', reviewController.getReviewById);

// Route to update a review
router.put('/update/:id', upload.single('Image'), reviewController.updateReview);

// Route to delete a review
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;
