# 🎉 FAQ Chatbot with Gemini AI - Setup Complete!

## ⚡ Quick Setup Checklist

Use this checklist to track your setup progress:

- [ ] **Prerequisites installed**
  - [ ] Node.js (v14+)
  - [ ] PostgreSQL (v12+)
  - [ ] Text editor

- [ ] **Backend setup**
  - [ ] Dependencies installed (`npm install`)
  - [ ] Database created (`faq_chatbot`)
  - [ ] `.env` configured (DB password + Gemini API key)
  - [ ] FAQs table created (`node createTable.js`)
  - [ ] Logs table created (`npm run setup-logs`)
  - [ ] Connection tested (`node testConnection.js`)

- [ ] **Frontend setup**
  - [ ] Dependencies installed (`npm install`)

- [ ] **Servers running**
  - [ ] Backend running on port 5000
  - [ ] Frontend running on port 3000
  - [ ] Browser shows chatbot

- [ ] **Functionality verified**
  - [ ] Bot responds to questions
  - [ ] Feedback buttons appear (👍 👎)
  - [ ] Feedback submission works

✅ **All checked? You're ready to go!**

---

## ✅ What's Been Built

### Backend Architecture (Modular Structure)

```
backend/
├── services/
│   └── geminiService.js     ✅ Gemini API integration
├── controllers/
│   ├── faqController.js     ✅ FAQ request handling
│   └── chatController.js    ✅ Chat request handling
├── routes/
│   ├── faqRoutes.js         ✅ GET /api/faqs
│   └── chatRoutes.js        ✅ POST /api/chat
├── models/
│   └── faqModel.js          ✅ Database queries
└── config/
    └── db.js                ✅ PostgreSQL pool
```

### Frontend Features

- ✅ **Chat UI**: Clean, modern interface
- ✅ **Fuzzy Search**: Fuse.js for local fallback
- ✅ **AI Integration**: Google Gemini API
- ✅ **Multi-turn Memory**: Conversation history tracking
- ✅ **Responsive Design**: Works on mobile

## 🔑 Configuration Needed

### Prerequisites

Before starting, ensure you have:
- ✅ **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- ✅ **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- ✅ **Git** (optional) - For cloning repository
- ✅ **Text editor** - VS Code, Sublime, etc.

### Step-by-Step Setup

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `@google/generative-ai` - Google Gemini SDK
- `express` - Web framework
- `pg` - PostgreSQL driver
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `nodemon` - Development auto-restart

**Expected output:**
```
added 150 packages, and audited 151 packages in 15s
```

#### 2. Configure PostgreSQL Database

**Option A: Using pgAdmin (GUI)**
1. Open **pgAdmin**
2. Connect to your PostgreSQL server (default: localhost)
3. Right-click on **Databases**
4. Select **Create** → **Database**
5. Enter name: `faq_chatbot`
6. Click **Save**

**Option B: Using Command Line**
```bash
# Windows (Command Prompt)
psql -U postgres -c "CREATE DATABASE faq_chatbot;"

# Windows (PowerShell)
& "C:\Program Files\PostgreSQL\[VERSION]\bin\psql.exe" -U postgres -c "CREATE DATABASE faq_chatbot;"

# Linux/Mac
createdb -U postgres faq_chatbot
```

**Verify database creation:**
```bash
psql -U postgres -d faq_chatbot -c "SELECT current_database();"
```

Expected output: `faq_chatbot`

#### 3. Update Environment Variables

Open `backend/.env` and update with your actual credentials:

```env
# Server Configuration
PORT=5000

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_actual_postgres_password_here
DB_NAME=faq_chatbot
DB_PORT=5432

# Google Gemini API Configuration
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Important:** 
- Replace `your_actual_postgres_password_here` with your PostgreSQL password
- Replace `your_actual_gemini_api_key_here` with your Gemini API key (see next step)

#### 4. Get Google Gemini API Key

**Get your API key:**
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Select a Google Cloud project (or create new one)
5. Copy the generated API key

**Add to `.env`:**
```env
GEMINI_API_KEY=AIzaSyDfG8h9JkLmNoPqRsTuVwXyZ1234567890
```

⚠️ **Important:** 
- Never commit your API key to version control
- The `.env` file is already in `.gitignore`
- Keep your API key secure

📖 **Detailed instructions:** `backend/GEMINI_SETUP.md`

#### 5. Create Database Tables

**Step 5a: Create FAQs Table**

Run the schema creation script:

```bash
# Option 1: Using Node.js script (recommended)
cd backend
node createTable.js

# Option 2: Using psql directly
psql -U postgres -d faq_chatbot -f database/schema.sql
```

**Expected output:**
```
📋 Creating FAQs table...
✅ FAQs table created successfully!
✅ Sample data inserted!
📝 Number of FAQs in database: 10
```

**Step 5b: Create Chat Logs Table**

```bash
# Option 1: Using Node.js script (recommended)
cd backend
npm run setup-logs

# Option 2: Using psql directly
psql -U postgres -d faq_chatbot -f database/createLogsTable.sql
```

**Expected output:**
```
📋 Creating chat_logs table...
✅ chat_logs table created successfully!
📝 Number of logs in database: 0
```

**Step 5c: Seed FAQ Data (Optional - for more FAQs)**

To load 20 FAQs instead of 10:

```bash
cd backend
npm run seed
```

**Expected output:**
```
📂 Loaded FAQ data from JSON file
🔄 Starting database transaction...
🗑️  Cleared existing FAQ data
✅ Seeded 20 FAQs successfully
🔌 Database connection closed
```

**Verify all tables exist:**
```bash
psql -U postgres -d faq_chatbot -c "\dt"
```

Expected output:
```
          List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | chat_logs  | table | postgres
 public | faqs       | table | postgres
```

#### 6. Test Database Connection

```bash
cd backend
node testConnection.js
```

**Expected output:**
```
🔍 Testing PostgreSQL connection...
✅ Connected to PostgreSQL database
✅ Successfully connected to PostgreSQL!
📊 PostgreSQL Version: PostgreSQL 18.3 on x86_64-windows, compiled by msvc-19.44.35223, 64-bit
✅ Table "faqs" exists
📝 Number of FAQs in database: 20
✅ Connection test PASSED
```

If you see errors, check:
- PostgreSQL is running
- Database credentials in `.env` are correct
- Database `faq_chatbot` exists

#### 7. Install Frontend Dependencies

```bash
# From root directory (faq_chatbot/)
npm install
```

This installs `http-server` for serving the frontend.

**Expected output:**
```
added 28 packages, and audited 29 packages in 3s
```

#### 8. Start the Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**
```
[nodemon] starting `node server.js`
✅ Connected to PostgreSQL database
🚀 Server is running on port 5000
📡 API available at http://localhost:5000/api
```

**Keep this terminal open!** The backend must stay running.

**Test the backend:**

Open a new terminal and run:
```bash
# Test health check
curl http://localhost:5000

# Test FAQs endpoint
curl http://localhost:5000/api/faqs
```

If you see JSON responses, the backend is working! ✅

#### 9. Start the Frontend

**Option A: Using HTTP Server (Recommended)**

Open a **new terminal** (keep backend running):

```bash
# From root directory (faq_chatbot/)
npm start
```

**Expected output:**
```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:3000
  http://192.168.1.100:3000
```

Open your browser to: **http://localhost:3000**

**Option B: Open Directly (Alternative)**

Simply open `index.html` in your browser (double-click the file).

⚠️ You'll see a security warning in console, but it works fine.

#### 10. Verify Everything Works

**In the browser console (F12), you should see:**
```
🔄 Fetching FAQs from backend...
✅ Loaded 20 FAQs successfully
🔍 Fuse.js initialized with 20 FAQs
```

**Test the chatbot:**
1. Type: "What is NOC?"
2. Press Enter
3. You should see:
   - Bot responds with an answer
   - 👍 👎 buttons appear below the response
   - Console shows: "✅ Chat response received from Gemini"

**Test feedback:**
1. Click 👍 on a bot message
2. Both buttons should disable
3. 👍 should be highlighted
4. Console shows: "✅ Feedback submitted successfully"

✅ **If all this works, setup is complete!** 🎉

### Troubleshooting Common Issues

#### Issue: "Cannot connect to database"
**Solution:**
1. Check PostgreSQL is running:
   ```bash
   # Windows
   Get-Service postgresql*
   
   # Should show "Running" status
   ```
2. Verify credentials in `.env`
3. Test connection: `node testConnection.js`

#### Issue: "GEMINI_API_KEY not set"
**Solution:**
1. Check `.env` file exists in `backend/` folder
2. Verify API key is on correct line: `GEMINI_API_KEY=AIza...`
3. No spaces around `=`
4. Restart backend after changing `.env`

#### Issue: "Table 'faqs' does not exist"
**Solution:**
```bash
cd backend
node createTable.js
```

#### Issue: "Table 'chat_logs' does not exist"
**Solution:**
```bash
cd backend
npm run setup-logs
```

#### Issue: Frontend shows "Failed to fetch FAQs"
**Solution:**
1. Check backend is running: `http://localhost:5000`
2. Check backend console for errors
3. Open browser DevTools → Network tab
4. Refresh page, check if `/api/faqs` request succeeds

#### Issue: Feedback buttons not appearing
**Solution:**
1. Check if `logId` is in response (browser console)
2. If missing, backend logging might have failed (check backend logs)
3. Verify `chat_logs` table exists: `npm run setup-logs`

#### Issue: "npm: command not found"
**Solution:**
1. Install Node.js: https://nodejs.org/
2. Restart terminal after installation
3. Verify: `node --version` and `npm --version`

### Quick Start Script (Windows)

Create a file `start.bat` in root directory:

```batch
@echo off
echo Starting FAQ Chatbot...
echo.

REM Start backend
start cmd /k "cd backend && npm run dev"

REM Wait 5 seconds for backend to start
timeout /t 5

REM Start frontend
start cmd /k "npm start"

echo.
echo Both servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to open browser...
pause
start http://localhost:3000
```

Then just double-click `start.bat` to start everything!

## 🎯 How It Works

### Chat Flow

1. **User sends message** → Frontend
2. **Frontend POSTs** to `/api/chat` with:
   - `message`: Current user message
   - `conversationHistory`: Previous turns
3. **Backend fetches** all 143 FAQs from PostgreSQL
4. **Backend calls Gemini** with:
   - System instruction (rules + FAQ list)
   - Conversation history
   - User message
5. **Gemini responds** naturally based on FAQ data
6. **Backend returns**:
   - `reply`: AI response
   - `updatedHistory`: Full conversation
7. **Frontend displays** response and updates history

### System Instructions

The bot is configured to:
- ✅ Answer ONLY using FAQ data
- ✅ Ask clarifying questions if ambiguous
- ✅ Admit when it doesn't know
- ✅ Keep responses concise and friendly
- ✅ Use natural, conversational tone

### Fallback Behavior

If Gemini API fails:
- Frontend falls back to local Fuse.js search
- Returns best matching FAQ answer
- User experience remains uninterrupted

## 📊 API Endpoints

### GET /api/faqs
Fetch all FAQs from database (for initialization)

### POST /api/chat
**Request:**
```json
{
  "conversationHistory": [
    { "role": "user", "content": "What is NOC?" },
    { "role": "assistant", "content": "A NOC is..." }
  ],
  "message": "How do I submit it?"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "You can submit your NOC through...",
  "updatedHistory": [
    { "role": "user", "content": "What is NOC?" },
    { "role": "assistant", "content": "A NOC is..." },
    { "role": "user", "content": "How do I submit it?" },
    { "role": "assistant", "content": "You can submit..." }
  ]
}
```

## 🧪 Testing

### Test the Chat Endpoint

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "conversationHistory": [],
    "message": "What is a NOC?"
  }'
```

### Test Questions

Try these in the chat:
- "What is NOC?"
- "How do I earn spurti points?"
- "Tell me about ViBe benefits"
- "Can I work remotely?"
- "What if I need to take leave?"

### Multi-turn Conversation

The bot remembers context:
- User: "What is NOC?"
- Bot: [Explains NOC]
- User: "How do I submit it?" ← Bot knows "it" = NOC
- Bot: [Explains submission process]

## 📁 File Responsibilities

### Backend

- **geminiService.js**: ONLY talks to Gemini API
  - Formats FAQ list
  - Builds system instruction
  - Makes API calls
  - Returns response text

- **chatController.js**: ONLY handles request/response
  - Validates input
  - Fetches FAQs from database
  - Calls geminiService
  - Formats response JSON

- **chatRoutes.js**: ONLY defines endpoints
  - Maps POST /chat to controller

### Frontend

- **script.js**: Main chat logic
  - Maintains `conversationHistory`
  - Sends POST to `/api/chat`
  - Updates history from response
  - Displays messages

- **faqSearch.js**: Local fuzzy search (fallback)
  - Fuse.js initialization
  - Search logic

## 🔐 Security Notes

- ❗ Never commit `.env` to version control
- ❗ API keys are in `.gitignore`
- ✅ User input is escaped (XSS protection)
- ✅ SQL uses parameterized queries
- ✅ CORS enabled (configure for production)

## 🚀 Next Steps (Optional Enhancements)

1. **Rate Limiting**: Prevent API abuse
2. **Caching**: Cache Gemini responses for common questions
3. **Analytics**: Track popular questions
4. **Admin Panel**: Manage FAQs without SQL
5. **User Feedback**: "Was this helpful?" buttons
6. **Export Conversations**: Download chat history

## 📖 Documentation

- `backend/README.md` - Backend overview
- `backend/GEMINI_SETUP.md` - Gemini API setup
- `README.md` - Project overview

## ✨ You're Ready to Go!

1. Install dependencies: `npm install` (backend)
2. Add Gemini API key to `.env`
3. Start backend: `npm run dev`
4. Start frontend: `npm start`
5. Open: http://localhost:3000
6. Start chatting! 🎉
