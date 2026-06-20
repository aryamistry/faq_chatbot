# 🧪 Testing the Feedback System

## Quick Test Checklist

### ✅ Backend Setup
- [ ] Database table created: `npm run setup-logs`
- [ ] Backend running: `npm run dev`
- [ ] Console shows: "🚀 Server is running on port 5000"

### ✅ Frontend Test

1. **Open the chatbot**
   - Open http://localhost:3000 (or index.html)
   - Console should show: "✅ Loaded 143 FAQs successfully"

2. **Send a message**
   - Type: "What is NOC?"
   - Press Enter or click Send
   - Wait for bot response

3. **Check feedback buttons appear**
   - [ ] Bot message displays
   - [ ] 👍 button visible
   - [ ] 👎 button visible
   - [ ] Buttons are semi-transparent
   - [ ] Hover makes them more visible

4. **Submit positive feedback**
   - Click 👍
   - [ ] Both buttons become disabled
   - [ ] 👍 is highlighted (bigger, opaque)
   - [ ] 👎 stays dim
   - [ ] Console shows: "✅ Feedback submitted successfully"

5. **Try clicking again**
   - Try clicking 👎
   - [ ] Nothing happens (buttons are disabled)

6. **Send another message**
   - Ask: "How do I earn spurti points?"
   - [ ] New message shows new feedback buttons
   - [ ] Previous message buttons stay disabled

7. **Submit negative feedback**
   - Click 👎 on new message
   - [ ] Both buttons disable
   - [ ] 👎 is highlighted
   - [ ] 👍 stays dim

### ✅ Database Verification

```bash
# Connect to database
psql -U postgres -d faq_chatbot

# Check logs
SELECT id, user_message, LEFT(bot_reply, 50) as reply_preview, feedback, created_at
FROM chat_logs
ORDER BY created_at DESC;
```

Expected output:
```
 id | user_message              | reply_preview                    | feedback | created_at
----+---------------------------+----------------------------------+----------+------------
  2 | How do I earn spurti...   | You can earn Spurti Points by... | down     | 2024-...
  1 | What is NOC?              | A NOC is a No Objection...      | up       | 2024-...
```

### ✅ API Test

**Test feedback stats:**
```bash
curl http://localhost:5000/api/feedback/stats
```

Expected:
```json
{
  "success": true,
  "stats": {
    "total_logs": 2,
    "positive": 1,
    "negative": 1,
    "no_feedback": 0
  }
}
```

**Test invalid feedback:**
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"logId": 1, "feedback": "invalid"}'
```

Expected error:
```json
{
  "success": false,
  "message": "feedback must be either \"up\" or \"down\""
}
```

### ✅ Console Logs

**Backend console should show:**
```
💬 Received chat message: "What is NOC?"
📚 Loaded 143 FAQs for context
✅ Gemini API response received
📝 Chat logged with ID: 1
✅ Chat response sent successfully
👍👎 Received feedback: up for log ID: 1
✅ Feedback recorded: up for log 1
```

**Frontend console should show:**
```
🔄 Fetching FAQs from backend...
✅ Loaded 143 FAQs successfully
🔍 Fuse.js initialized with 143 FAQs
✅ Chat response received from Gemini
📊 Submitting feedback: up for log 1
✅ Feedback submitted successfully
```

## 🐛 Troubleshooting

### Issue: Feedback buttons not appearing

**Check:**
1. Console errors in browser?
2. Is `logId` in the response?
   ```javascript
   // In browser console after sending message
   // Look for: logId: 123
   ```
3. Is CSS loaded? Check `.feedback-buttons` class exists

**Fix:**
- Refresh page (Ctrl+Shift+R)
- Check `script.js` loaded after `faqSearch.js`
- Verify backend is running

### Issue: Feedback not saving

**Check:**
1. Backend console for errors
2. Database connection working?
   ```bash
   cd backend
   node testConnection.js
   ```
3. Table exists?
   ```sql
   \dt chat_logs
   ```

**Fix:**
- Run: `npm run setup-logs`
- Check `.env` database credentials
- Restart backend

### Issue: Buttons don't disable after click

**Check:**
1. Browser console for JavaScript errors
2. Network tab shows 200 response?
3. Response has `success: true`?

**Fix:**
- Check `submitFeedback` function in script.js
- Verify API endpoint URL is correct
- Clear browser cache

## 📊 Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Send message | Bot replies with feedback buttons |
| Hover button | Button becomes opaque, scales up |
| Click 👍 | Both buttons disable, 👍 highlighted |
| Click 👎 | Both buttons disable, 👎 highlighted |
| Click again | Nothing (buttons disabled) |
| New message | New buttons appear, old stay disabled |
| Check DB | Row with feedback value exists |
| Call stats API | Returns accurate counts |

## ✅ All Tests Pass?

If all checks pass, your feedback system is working perfectly! 🎉

You can now:
- Collect user feedback on responses
- Analyze which responses are helpful
- Identify problematic answers
- Track satisfaction over time

## 📈 Next Steps

1. **Monitor feedback regularly**
   ```sql
   SELECT * FROM chat_logs WHERE feedback = 'down' ORDER BY created_at DESC;
   ```

2. **Calculate satisfaction rate**
   ```sql
   SELECT 
     ROUND(COUNT(CASE WHEN feedback = 'up' THEN 1 END) * 100.0 / 
           NULLIF(COUNT(feedback), 0), 2) as satisfaction_rate
   FROM chat_logs;
   ```

3. **Review and improve**
   - Find common downvoted responses
   - Update FAQ database
   - Refine Gemini system instructions

Happy testing! 🚀
