# 🚀 Quick Start Guide

## For First-Time Setup

### Prerequisites
- ✅ Node.js installed
- ✅ PostgreSQL installed and running
- ✅ Google Gemini API key obtained

### One-Time Setup (5 minutes)

#### 1. Configure Environment
Edit `backend/.env`:
```env
DB_PASSWORD=your_postgres_password
GEMINI_API_KEY=your_gemini_api_key
```

#### 2. Create Database
```bash
psql -U postgres -c "CREATE DATABASE faq_chatbot;"
```

#### 3. Setup Tables
```bash
cd backend
npm install
node createTable.js
npm run setup-logs
```

#### 4. Install Frontend
```bash
cd ..
npm install
```

## Running the Chatbot

### Option 1: Quick Start Script (Windows)
```bash
# Just double-click this file:
start.bat
```

### Option 2: Manual Start

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm start
```

Then open: http://localhost:3000

## Verify Setup

### ✅ Checklist

- [ ] Backend shows: "🚀 Server is running on port 5000"
- [ ] Frontend shows: "Available on: http://127.0.0.1:3000"
- [ ] Browser console shows: "✅ Loaded X FAQs successfully"
- [ ] Bot responds to: "What is NOC?"
- [ ] 👍 👎 buttons appear under bot messages
- [ ] Clicking feedback button works

## Troubleshooting

### Backend won't start
```bash
# Test database connection
cd backend
node testConnection.js
```

### Frontend shows errors
Check:
1. Backend is running: http://localhost:5000
2. Browser console for errors (F12)
3. CORS is enabled in backend

### No feedback buttons
```bash
# Verify chat_logs table exists
cd backend
npm run setup-logs
```

## Common Commands

```bash
# Backend commands
cd backend
npm run dev         # Start development server
npm run seed        # Load FAQ data
npm run setup-logs  # Create logs table
node testConnection.js  # Test database

# Frontend commands
npm start           # Start HTTP server

# Database commands
psql -U postgres -d faq_chatbot    # Connect to database
psql -U postgres -d faq_chatbot -c "SELECT COUNT(*) FROM faqs;"     # Count FAQs
psql -U postgres -d faq_chatbot -c "SELECT * FROM chat_logs LIMIT 5;"  # View logs
```

## Quick Links

- 📖 Full Setup: `SETUP_COMPLETE.md`
- 🔑 Gemini Setup: `backend/GEMINI_SETUP.md`
- 👍 Feedback Setup: `backend/FEEDBACK_SETUP.md`
- 🧪 Testing: `TEST_FEEDBACK.md`

## Support

If you're stuck:
1. Check the troubleshooting sections in each guide
2. Verify all prerequisites are met
3. Review error messages in console/terminal
4. Ensure `.env` file has correct values

Happy chatting! 🎉
