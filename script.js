// DOM elements
const messageList = document.getElementById('messageList');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const initialTimestamp = document.getElementById('initialTimestamp');

// In-memory FAQ cache (loaded once per session)
let faqList = [];

// Conversation history for multi-turn chat with Gemini
let conversationHistory = [];

// API endpoints
const API_URL = 'http://localhost:5000/api/faqs';
const CHAT_API_URL = 'http://localhost:5000/api/chat';
const FEEDBACK_API_URL = 'http://localhost:5000/api/feedback';

// Set initial timestamp
initialTimestamp.textContent = getCurrentTimestamp();

// Event listeners
sendButton.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});

// Load FAQs on page load
document.addEventListener('DOMContentLoaded', loadFaqs);

/**
 * Load FAQs from backend API
 * Fetches FAQ data once on page load and stores in memory
 */
async function loadFaqs() {
    try {
        console.log('🔄 Fetching FAQs from backend...');
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
            faqList = data.data;
            console.log(`✅ Loaded ${faqList.length} FAQs successfully`);
            
            // Initialize Fuse.js with the loaded FAQ data
            initializeFuse(faqList);
        } else {
            throw new Error('Invalid response format from API');
        }
        
    } catch (error) {
        console.error('❌ Error loading FAQs:', error.message);
        console.warn('⚠️  FAQ list will remain empty. Make sure backend is running at', API_URL);
        faqList = [];
    }
}

/**
 * Handle send button click or Enter key press
 */
async function handleSend() {
    const message = userInput.value.trim();
    
    // Don't send empty messages
    if (!message) {
        return;
    }
    
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input field
    userInput.value = '';
    
    // Disable input while bot is "thinking"
    setInputEnabled(false);
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Send message to Gemini chat endpoint
        const response = await fetch(CHAT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversationHistory: conversationHistory,
                message: message
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        removeTypingIndicator();
        
        if (data.success) {
            // Update conversation history with the full history from backend
            conversationHistory = data.updatedHistory;
            
            // Display bot's reply with logId for feedback
            addBotMessage(data.reply, data.logId);
            console.log('✅ Chat response received from Gemini');
        } else {
            throw new Error(data.message || 'Failed to get response');
        }
        
    } catch (error) {
        console.error('❌ Error sending message:', error);
        removeTypingIndicator();
        
        // Fallback to local fuzzy search if API fails
        console.log('⚠️  Falling back to local search...');
        const results = searchFaqs(message);
        
        let botResponse;
        if (results.length > 0) {
            const topResult = results[0];
            botResponse = topResult.item.answer;
        } else {
            botResponse = "I couldn't find anything on that. Try rephrasing?";
        }
        
        addBotMessage(botResponse, null);
    }
    
    setInputEnabled(true);
    userInput.focus();
}

/**
 * Add a user message to the chat
 * @param {string} text - The message text
 */
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    messageDiv.innerHTML = `
        <div class="message-bubble">
            <div class="message-text">${escapeHtml(text)}</div>
            <div class="message-timestamp">${getCurrentTimestamp()}</div>
        </div>
    `;
    
    messageList.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Add a bot message to the chat
 * @param {string} text - The message text
 * @param {number|null} logId - The log ID for feedback (null for fallback responses)
 */
function addBotMessage(text, logId = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // Store logId as data attribute if available
    if (logId !== null) {
        messageDiv.setAttribute('data-log-id', logId);
    }
    
    const feedbackButtons = logId !== null ? `
        <div class="feedback-buttons">
            <button class="feedback-btn feedback-up" onclick="submitFeedback(${logId}, 'up', this)" title="Helpful">
                👍
            </button>
            <button class="feedback-btn feedback-down" onclick="submitFeedback(${logId}, 'down', this)" title="Not helpful">
                👎
            </button>
        </div>
    ` : '';
    
    messageDiv.innerHTML = `
        <div class="message-bubble">
            <div class="message-text">${escapeHtml(text)}</div>
            <div class="message-timestamp">${getCurrentTimestamp()}</div>
            ${feedbackButtons}
        </div>
    `;
    
    messageList.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Submit feedback for a bot message
 * @param {number} logId - The log ID
 * @param {string} feedback - 'up' or 'down'
 * @param {HTMLElement} button - The clicked button element
 */
async function submitFeedback(logId, feedback, button) {
    try {
        console.log(`📊 Submitting feedback: ${feedback} for log ${logId}`);
        
        // Send feedback to backend
        const response = await fetch(FEEDBACK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                logId: logId,
                feedback: feedback
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            // Disable both buttons in this message
            const messageDiv = button.closest('.message');
            const allButtons = messageDiv.querySelectorAll('.feedback-btn');
            allButtons.forEach(btn => {
                btn.disabled = true;
                btn.style.cursor = 'not-allowed';
                btn.style.opacity = '0.5';
            });
            
            // Highlight the selected button
            button.style.opacity = '1';
            button.style.transform = 'scale(1.2)';
            
            console.log('✅ Feedback submitted successfully');
        } else {
            throw new Error(data.message || 'Failed to submit feedback');
        }
        
    } catch (error) {
        console.error('❌ Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
    }
}

/**
 * Show typing indicator (3 animated dots)
 */
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    messageList.appendChild(typingDiv);
    scrollToBottom();
}

/**
 * Remove typing indicator from chat
 */
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

/**
 * Enable or disable the input field and send button
 * @param {boolean} enabled - Whether to enable or disable
 */
function setInputEnabled(enabled) {
    userInput.disabled = !enabled;
    sendButton.disabled = !enabled;
}

/**
 * Scroll the message list to the bottom
 */
function scrollToBottom() {
    messageList.scrollTop = messageList.scrollHeight;
}

/**
 * Get current time formatted as HH:MM AM/PM
 * @returns {string} Formatted timestamp
 */
function getCurrentTimestamp() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Focus input on page load
userInput.focus();
