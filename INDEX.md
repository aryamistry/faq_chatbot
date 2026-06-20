# 📚 FAQ Chatbot - Complete Documentation Index

## 🎯 Where to Start?

### 👤 I'm new here - How do I get started?
→ **[QUICK_START.md](QUICK_START.md)** - 5-minute setup guide

### 🔧 I need detailed setup instructions
→ **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Comprehensive step-by-step guide

### 🚀 I just want to run it now!
→ Windows: Double-click **`start.bat`**  
→ Manual: See [Quick Start](#quick-start) below

---

## 📖 Documentation Structure

### Core Documentation

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[README.md](README.md)** | Project overview | First thing to read |
| **[QUICK_START.md](QUICK_START.md)** | Fast setup (5 min) | When you want to get running quickly |
| **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** | Detailed setup | When you need step-by-step instructions |

### Feature-Specific Guides

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **[backend/GEMINI_SETUP.md](backend/GEMINI_SETUP.md)** | Get Gemini API key | When setting up AI integration |
| **[backend/FEEDBACK_SETUP.md](backend/FEEDBACK_SETUP.md)** | Feedback system details | When setting up feedback logging |
| **[FEEDBACK_COMPLETE.md](FEEDBACK_COMPLETE.md)** | Feedback feature summary | After adding feedback system |
| **[TEST_FEEDBACK.md](TEST_FEEDBACK.md)** | Testing checklist | When verifying feedback works |

### Backend Documentation

| Document | Purpose |
|----------|---------|
| **[backend/README.md](backend/README.md)** | Backend API documentation |
| **[backend/database/schema.sql](backend/database/schema.sql)** | FAQs table schema |
| **[backend/database/createLogsTable.sql](backend/database/createLogsTable.sql)** | Logs table schema |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- Google Gemini API key

### Setup (One Time)

1. **Configure environment**
   ```bash
   # Edit backend/.env with your credentials
   DB_PASSWORD=your_postgres_password
   GEMINI_API_KEY=your_gemini_api_key
   ```

2. **Create database**
   ```bash
   psql -U postgres -c "CREATE DATABASE faq_chatbot;"
   ```

3. **Setup backend**
   ```bash
   cd backend
   npm install
   node createTable.js
   npm run setup-logs
   ```

4. **Setup frontend**
   ```bash
   cd ..
   npm install
   ```

### Run

**Option 1: Automated (Windows)**
```bash
start.bat
```

**Option 2: Manual**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
npm start
```

Open: http://localhost:3000

---

## 🏗️ Project Architecture

```
faq_chatbot/
├── 📄 Documentation
│   ├── README.md                    # Main overview
│   ├── INDEX.md                     # This file (navigation)
│   ├── QUICK_START.md               # Fast setup guide
│   ├── SETUP_COMPLETE.md            # Detailed setup
│   ├── FEEDBACK_COMPLETE.md         # Feedback summary
│   └── TEST_FEEDBACK.md             # Testing guide
│
├── 🎨 Frontend
│   ├── index.html                   # Chat UI
│   ├── style.css                    # Styles
│   ├── script.js                    # Main logic
│   ├── faqSearch.js                 # Fuzzy search
│   └── package.json                 # Frontend deps
│
├── ⚙️ Backend
│   ├── config/
│   │   └── db.js                    # PostgreSQL pool
│   ├── services/
│   │   └── geminiService.js         # Gemini AI integration
│   ├── controllers/
│   │   ├── faqController.js         # FAQ logic
│   │   ├── chatController.js        # Chat logic
│   │   └── feedbackController.js    # Feedback logic
│   ├── models/
│   │   ├── faqModel.js              # FAQ queries
│   │   └── logModel.js              # Log queries
│   ├── routes/
│   │   ├── faqRoutes.js             # FAQ endpoints
│   │   ├── chatRoutes.js            # Chat endpoints
│   │   └── feedbackRoutes.js        # Feedback endpoints
│   ├── database/
│   │   ├── schema.sql               # FAQs table
│   │   └── createLogsTable.sql      # Logs table
│   ├── seed/
│   │   ├── faqData.json             # FAQ seed data
│   │   └── seedFaqs.js              # Seed script
│   ├── server.js                    # Main server
│   ├── .env                         # Configuration
│   ├── package.json                 # Backend deps
│   └── README.md                    # Backend docs
│
└── 🚀 Scripts
    └── start.bat                    # Windows launcher
```

---

## 🔑 Key Features

### ✅ Implemented

1. **Modern Chat UI**
   - Clean, responsive design
   - Real-time typing indicators
   - Timestamp on every message
   - Mobile-friendly

2. **AI-Powered Responses**
   - Google Gemini integration
   - Natural language understanding
   - Multi-turn conversation memory
   - Context-aware responses

3. **Fuzzy Search Fallback**
   - Fuse.js for local search
   - Works when API is down
   - Fast, client-side matching

4. **Feedback System**
   - 👍 👎 on every response
   - Tracked in PostgreSQL
   - Analytics endpoint
   - One vote per message

5. **Modular Architecture**
   - Clean separation of concerns
   - Single responsibility principle
   - Easy to maintain and extend

6. **Error Handling**
   - Graceful degradation
   - User always gets a response
   - Logging never blocks chat

---

## 📊 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Health check |
| GET | `/api/faqs` | Get all FAQs |
| POST | `/api/chat` | Send message, get AI response |
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/feedback/stats` | Get feedback statistics |

---

## 🛠️ Technologies

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla)
- Fuse.js (fuzzy search)

**Backend:**
- Node.js + Express
- PostgreSQL + pg driver
- Google Gemini AI
- dotenv, cors

**Database:**
- PostgreSQL 12+
- Two tables: `faqs`, `chat_logs`

---

## 🎓 Learning Resources

### Understanding the Code

1. **Backend Flow**
   ```
   User message → Route → Controller → Service/Model → Response
   ```

2. **Frontend Flow**
   ```
   User input → Fetch API → Display response → Handle feedback
   ```

3. **Database Flow**
   ```
   Chat → Log to DB → Return logId → User feedback → Update log
   ```

### Key Files to Understand

| File | What It Does | Complexity |
|------|--------------|------------|
| `script.js` | Frontend chat logic | ⭐⭐ Medium |
| `backend/server.js` | App initialization | ⭐ Easy |
| `backend/controllers/chatController.js` | Chat request handling | ⭐⭐⭐ Advanced |
| `backend/services/geminiService.js` | Gemini API calls | ⭐⭐⭐ Advanced |
| `backend/models/logModel.js` | Database queries | ⭐⭐ Medium |

---

## 🐛 Common Issues & Solutions

### Setup Issues

| Problem | Solution |
|---------|----------|
| "Node.js not found" | Install from https://nodejs.org/ |
| "Database does not exist" | Run: `psql -U postgres -c "CREATE DATABASE faq_chatbot;"` |
| "Table does not exist" | Run: `node createTable.js` and `npm run setup-logs` |
| "GEMINI_API_KEY not set" | Add to `backend/.env` |

### Runtime Issues

| Problem | Solution |
|---------|----------|
| Backend won't start | Check PostgreSQL is running, verify `.env` |
| Frontend shows errors | Ensure backend is running on port 5000 |
| No feedback buttons | Verify `chat_logs` table exists |
| Bot doesn't respond | Check Gemini API key is valid |

---

## 📞 Need Help?

1. **Check error messages** - They usually point to the problem
2. **Review documentation** - Use this index to find relevant guides
3. **Check console logs** - Both browser and backend terminals
4. **Test connections** - Run `node testConnection.js`
5. **Verify setup** - Use checklist in SETUP_COMPLETE.md

---

## 🎯 Next Steps

After setup:
1. ✅ Test the chatbot with sample questions
2. ✅ Add your own FAQs to database
3. ✅ Customize the UI (colors, branding)
4. ✅ Monitor feedback analytics
5. ✅ Improve responses based on feedback

---

## 📝 Quick Commands Reference

### Database
```bash
# Create database
psql -U postgres -c "CREATE DATABASE faq_chatbot;"

# Connect to database
psql -U postgres -d faq_chatbot

# View FAQs
psql -U postgres -d faq_chatbot -c "SELECT * FROM faqs;"

# View logs
psql -U postgres -d faq_chatbot -c "SELECT * FROM chat_logs ORDER BY created_at DESC LIMIT 10;"
```

### Backend
```bash
cd backend
npm install              # Install dependencies
npm run dev             # Start development server
npm run seed            # Load FAQ data
npm run setup-logs      # Create logs table
node testConnection.js  # Test database connection
node createTable.js     # Create FAQs table
```

### Frontend
```bash
npm install    # Install dependencies
npm start      # Start HTTP server
```

---

## 🎉 You're All Set!

This chatbot has everything you need:
- ✅ Modern UI
- ✅ AI-powered responses
- ✅ Feedback tracking
- ✅ Analytics
- ✅ Modular code
- ✅ Complete documentation

**Ready to start?** → [QUICK_START.md](QUICK_START.md)

Happy coding! 🚀
