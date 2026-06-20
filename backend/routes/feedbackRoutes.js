/**
 * Feedback Routes
 * Defines all routes related to feedback endpoints
 */

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// POST /feedback - Submit feedback for a chat log
router.post('/feedback', feedbackController.submitFeedback);

// GET /feedback/stats - Get feedback statistics (optional analytics endpoint)
router.get('/feedback/stats', feedbackController.getFeedbackStats);

module.exports = router;
