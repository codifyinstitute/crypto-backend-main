const fs = require('fs');
const path = require('path');
const Review = require('../Models/reviewModel');

// Add a new review
const  addReview = async (req, res) => {
    const { Name, Title, Quote } = req.body;

    let Image = req.body.Image;
    if (req.file) {
        Image = req.file.filename;
    }

    try {
        const review = new Review({
            Name,
            Title,
            Quote,
            Image
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error)
    }
};

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    const { Name, Title, Quote } = req.body; // Destructure the properties
    let Image = req.body.Image;

    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Delete the old image if a new one is uploaded
        if (req.file) {
            const oldImagePath = path.join(__dirname, '../uploads', review.Image); // Adjust path as needed
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error(`Error deleting old image: ${err}`);
            });
            Image = req.file.filename;
        } else {
            Image = review.Image; // Keep the old image if no new one is uploaded
        }

        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { Name, Title, Quote, Image }, { new: true });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error)
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        // Delete the associated image
        const imagePath = path.join(__dirname, '../uploads', review.Image); // Adjust path as needed
        fs.unlink(imagePath, (err) => {
            if (err) console.error(`Error deleting image: ${err}`);
        });

        await Review.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
