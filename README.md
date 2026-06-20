# FAQ Chatbot - VINS Assistant

A full-stack FAQ chatbot application with a clean chat interface and PostgreSQL backend.

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

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

### 2. Start the Frontend

**Option A: Simple HTTP Server (Recommended)**
```bash
# From the root directory (faq_chatbot/)
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

**Option B: Direct File Open (Works but shows security warning)**
- Just open `index.html` in your browser
- Functionality works, but you'll see a console warning

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
