/**
 * Feedback Controller
 * Handles feedback submission for chat logs
 */

const logModel = require('../models/logModel');

/**
 * Submit feedback for a chat log
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function submitFeedback(req, res) {
    try {
        // Extract data from request body
        const { logId, feedback } = req.body;
        
        // Validate logId
        if (!logId || typeof logId !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'logId is required and must be a number'
            });
        }
        
        // Validate feedback value
        if (!feedback || !['up', 'down'].includes(feedback)) {
            return res.status(400).json({
                success: false,
                message: 'feedback must be either "up" or "down"'
            });
        }
        
        console.log(`👍👎 Received feedback: ${feedback} for log ID: ${logId}`);
        
        // Update feedback in database
        await logModel.updateFeedback(logId, feedback);
        
        // Send successful response
        res.status(200).json({
            success: true,
            message: 'Feedback recorded successfully'
        });
        
        console.log(`✅ Feedback recorded: ${feedback} for log ${logId}`);
        
    } catch (error) {
        console.error('❌ Error in feedback controller:', error.message);
        
        // Send error response
        res.status(500).json({
            success: false,
            message: 'Failed to record feedback',
            error: error.message
        });
    }
}

/**
 * Get feedback statistics (optional endpoint for analytics)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getFeedbackStats(req, res) {
    try {
        const stats = await logModel.getFeedbackStats();
        
        res.status(200).json({
            success: true,
            stats: stats
        });
        
    } catch (error) {
        console.error('❌ Error getting feedback stats:', error.message);
        
        res.status(500).json({
            success: false,
            message: 'Failed to get feedback statistics',
            error: error.message
        });
    }
}

module.exports = {
    submitFeedback,
    getFeedbackStats
};
