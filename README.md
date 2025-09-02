````markdown
# ⚡️ UI-Chatbot – The All-in-One AI Assistant Platform  

![Build](https://img.shields.io/badge/build-passing-brightgreen)  
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Bootstrap%20%7C%20JS--Beautify-blue)  
![License](https://img.shields.io/badge/license-MIT-lightgrey)  
![Stars](https://img.shields.io/github/stars/Siddharthpatni/UI-Chatbot?style=social)  

---

## ✨ Why This Project?  
UI-Chatbot isn’t just another chatbot. It’s a **multi-tool AI hub** that merges:  
💬 Conversations • 📄 Document Intelligence • 🧑‍💻 Coding • 🌐 Web Search • 🔄 Model Switching • 🤝 Collaboration • 📤 Export  

Think of it as your **AI Operating System** – with tabs.  

---

## 🚀 Features at a Glance  

### 💬 Chat Assistant  
- Multi-chat sessions with persistent history.  
- Dark/Light mode for distraction-free use.  
- Upload & preview **PDF documents** directly in chat.  
- Sidebar navigation for seamless context switching.  

---

### 🔌 API Settings  
- Connect to **custom AI/LLM backends**.  
- Save endpoints with persistence.  
- One-click **connection test** with live feedback.  

---

### 🌐 Web Search  
- Query external sources via API.  
- Structured results: **title, snippet, link**.  
- Error-resilient, lightweight, extensible.  

---

### 📄 Document Q&A  
- Upload `.pdf`, `.docx`, `.txt`.  
- Ask natural language questions.  
- Get extracted answers instantly.  

---

### 🧑‍💻 Code Assistant  
- Multi-language editor (JS, Python, Java, PHP, TS, HTML, CSS).  
- Syntax highlighting with Prism.  
- Auto-formatting with `js-beautify`.  
- Save, load, and manage code snippets.  

---

### 🤝 Collaboration Hub  
- Invite teammates by email.  
- Role-based permissions: **Owner, Editor, Viewer**.  
- Toggle chats **Public/Private**.  
- Shareable access links.  

---

### 🎨 Prompt Templates  
- Save your **best prompts** for reuse.  
- Quick add, edit, and delete.  
- Persisted across sessions.  

---

### 🔄 Model Switcher  
- Choose between **GPT-4, Claude 2, LLaMA-2, Gemini**.  
- Manage per-model API keys.  
- Test connections instantly.  
- Active model persisted for reuse.  

---

### 📤 Export Conversations  
- Export chats to **PDF, Word, or TXT**.  
- One-click export with clean formatting.  
- Ideal for reporting and archiving.  

---

## 🛠 Tech Stack  

- **Frontend:** React + React Router  
- **UI Components:** React-Bootstrap, React-Icons  
- **Persistence:** LocalStorage  
- **PDF Handling:** `react-pdf`  
- **Syntax Highlighting:** Prism (`react-syntax-highlighter`)  
- **Code Beautification:** `js-beautify`  

---

## ⚙️ Installation  

```bash
# Clone repository
git clone https://github.com/Siddharthpatni/UI-Chatbot.git
cd UI-Chatbot

# Install dependencies
npm install

# Start development server
npm start
````

Runs on **[http://localhost:3000](http://localhost:3000)**

---

## 🗂 Project Structure

```
├── App.js             # Routing across modules
├── Chatbot.js         # Core chat UI (multi-chat + PDF support)
├── ApiSettings.js     # API endpoint manager
├── WebSearch.js       # Web knowledge integration
├── DocumentQA.js      # File-based Q&A
├── CodeAssistant.js   # Multi-language code editor
├── Collaboration.js   # Team chat + permissions
├── PromptTemplates.js # Save reusable prompts
├── ModelSwitcher.js   # Model selection + API keys
├── ExportChat.js      # Export utility
└── components/context # Auth + global state
```

---

## 🌟 Why It Stands Out

* **Pluggable by design:** swap APIs and models on the fly.
* **End-to-end workflow:** Chat → Search → Doc QA → Code → Export → Collaborate.
* **Team-ready:** multi-user with role-based permissions.
* **Productivity-first:** snippets, templates, and export built-in.

---

## 🔮 Roadmap

* Real-time backend (WebSocket support).
* OAuth2/Firebase authentication.
* Persistent DB (SQLite/Postgres).
* Plugin marketplace for integrations.
* Analytics dashboards.
