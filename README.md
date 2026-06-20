# FAQ Chatbot - VINS Assistant

A full-stack FAQ chatbot application with AI-powered responses, feedback tracking, and a clean modern chat interface.

## 📚 Documentation

**New here?** Start with the **[Documentation Index (INDEX.md)](INDEX.md)** for a complete guide to all documentation.

### Quick Links
- 🚀 **[Quick Start Guide](QUICK_START.md)** - Get running in 5 minutes
- 📋 **[Complete Setup Guide](SETUP_COMPLETE.md)** - Detailed step-by-step instructions  
- 📖 **[Documentation Index](INDEX.md)** - Complete navigation of all docs
- 🔑 **[Gemini API Setup](backend/GEMINI_SETUP.md)** - Get your API key
- 👍 **[Feedback System](backend/FEEDBACK_SETUP.md)** - How feedback works
- 🧪 **[Testing Guide](TEST_FEEDBACK.md)** - Verify everything works

## 🏗️ Project Structure

```
faq_chatbot/
├── backend/              # Node.js + Express + PostgreSQL backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic (FAQ, Chat, Feedback)
│   ├── models/          # Database queries (FAQ, Logs)
│   ├── routes/          # API routes (FAQ, Chat, Feedback)
│   ├── services/        # External services (Gemini AI)
│   ├── seed/            # Database seed scripts
│   ├── database/        # SQL schema files
│   └── server.js        # Main server file
├── index.html           # Frontend HTML
├── style.css            # Frontend styles
├── script.js            # Frontend JavaScript
└── faqSearch.js         # Fuzzy search module
```

## 🚀 Quick Start

### First Time Setup
See **[QUICK_START.md](QUICK_START.md)** for 5-minute setup guide.

**Or use the automated script (Windows):**
```bash
# Just double-click:
start.bat
```

### Already Setup?

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

Then open: **http://localhost:3000**

## 📖 Documentation

- 🚀 **[Quick Start Guide](QUICK_START.md)** - Get running in 5 minutes
- 📋 **[Complete Setup Guide](SETUP_COMPLETE.md)** - Detailed step-by-step instructions
- 🔑 **[Gemini API Setup](backend/GEMINI_SETUP.md)** - Get your API key
- 👍 **[Feedback System](backend/FEEDBACK_SETUP.md)** - How feedback works
- 🧪 **[Testing Guide](TEST_FEEDBACK.md)** - Verify everything works

## 🛠️ Technologies Used

**Frontend:**
- Pure HTML5, CSS3, JavaScript (no frameworks)
- Responsive design
- Modern chat UI
- Fuse.js for fuzzy search

**Backend:**
- Node.js + Express
- PostgreSQL with pg driver
- Google Gemini AI (gemini-1.5-flash)
- CORS enabled
- Environment-based configuration

## 📡 API Endpoints

- `GET http://localhost:5000/api/faqs` - Get all FAQs

## ✅ Current Status

- ✅ Frontend UI built with vanilla HTML/CSS/JS
- ✅ Backend API with PostgreSQL
- ✅ FAQ data fetched and cached on page load
- ✅ 143 FAQs loaded in database
- ✅ Google Gemini AI integration for natural responses
- ✅ Multi-turn conversation memory
- ✅ Fuzzy search fallback (Fuse.js)
- ✅ Feedback logging system (👍 👎)
- ✅ Analytics endpoint for feedback statistics

## 🛠️ Technologies

**Frontend:**
- Pure HTML5, CSS3, JavaScript (no frameworks)
- Responsive design
- Modern chat UI

**Backend:**
- Node.js + Express
- PostgreSQL with pg driver
- CORS enabled
- Environment-based configuration

## 📝 Notes

- The backend uses connection pooling for efficient database connections
- CORS is enabled for all origins (configure for production use)
- Error handling is implemented with try/catch blocks
- The code follows a modular architecture with separation of concerns
- Gemini AI provides natural language responses based on FAQ data
- Conversation history enables multi-turn conversations with context
- Frontend falls back to local fuzzy search if API is unavailable
