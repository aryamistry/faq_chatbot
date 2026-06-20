/**
 * Chat Controller
 * Handles chat request/response logic
 */

const faqModel = require('../models/faqModel');
const geminiService = require('../services/geminiService');
const logModel = require('../models/logModel');

/**
 * Handle chat request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleChat(req, res) {
    try {
        // Extract data from request body
        const { conversationHistory = [], message } = req.body;
        
        // Validate user message
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Message is required and must be a non-empty string'
            });
        }
        
        console.log(`💬 Received chat message: "${message}"`);
        
        // Fetch FAQ list from database
        const faqList = await faqModel.getAllFaqs();
        console.log(`📚 Loaded ${faqList.length} FAQs for context`);
        
        // Get response from Gemini API
        const reply = await geminiService.getChatResponse(
            faqList,
            conversationHistory,
            message
        );
        
        // Build updated conversation history
        const updatedHistory = [
            ...conversationHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: reply }
        ];
        
        // Try to log the conversation to database (non-blocking)
        // If logging fails, we still return the reply to the user
        let logId = null;
        try {
            logId = await logModel.createLog(message, reply);
            console.log(`📝 Chat logged with ID: ${logId}`);
        } catch (logError) {
            console.error('⚠️  Failed to log conversation to database:', logError.message);
            console.error('   (Continuing to send reply to user)');
            // Don't throw - we still want to send the reply
        }
        
        // Send successful response (with or without logId)
        const response = {
            success: true,
            reply: reply,
            updatedHistory: updatedHistory
        };
        
        // Only include logId if logging succeeded
        if (logId !== null) {
            response.logId = logId;
        }
        
        res.status(200).json(response);
        
        console.log('✅ Chat response sent successfully');
        
    } catch (error) {
        console.error('❌ Error in chat controller:', error.message);
        
        // Send error response
        res.status(500).json({
            success: false,
            message: 'Failed to process chat request',
            error: error.message
        });
    }
}

module.exports = {
    handleChat
};
