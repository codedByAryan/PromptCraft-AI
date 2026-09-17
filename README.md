# 🚀 PromptCraft AI – Intelligent Chat Application

A ChatGPT-inspired AI chat interface built using the MERN stack, with added utilities like prompt enhancement and automatic language translation/refinement.

The goal of PromptCraft AI is to provide a seamless, intelligent chat experience that goes beyond a basic wrapper around an LLM API — it actively improves the quality of what the user is asking.

## 🔗 Live Demo

[Add your deployed link here, or note "Not deployed yet — run locally" if it isn't hosted]

## 🌟 Key Features

- **Secure Authentication** — full registration/login flow to keep chats private
- **Modern Chat Interface** — a responsive UI similar to the ChatGPT experience
- **Powered by OpenRouter** — integrated with the OpenRouter API to access multiple LLMs
- **Smart Prompt Enhancer** — takes vague or "lazy" prompts and expands them into detailed, high-quality instructions before sending them to the AI
- **Language Bridge** — automatically converts Hindi or Hinglish prompts into professional English for more accurate AI responses
- **Persistent Memory** — chat history is stored in MongoDB, so conversations survive a page refresh
- **Chat Management** — sidebar for organizing multiple chat sessions, with the ability to delete old conversations
- **Responsive Design** — built with Tailwind CSS, works cleanly across desktop and mobile

## 🛠️ Tech Stack

**Frontend**
- React.js — dynamic, reactive UI
- Tailwind CSS — utility-first styling
- Axios — API requests to the backend

**Backend**
- Node.js & Express.js — server-side logic and routing
- MongoDB & Mongoose — storing user profiles and chat threads

**AI & Auth**
- OpenRouter API — access to multiple LLMs
- JWT (JSON Web Tokens) — secure user authentication

## 📂 Project Structure

```
PromptCraft-AI/
├── backend/
│   ├── models/        # Mongoose schemas (User, Chat)
│   ├── routes/        # API endpoints (Auth, AI, Chats)
│   ├── middleware/    # Auth verification
│   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI elements (Sidebar, Message, Input)
│   │   ├── pages/       # Login, Register, Chat Dashboard
│   │   └── App.js       # Routing and state management
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/codedByAryan/PromptCraft-AI.git
cd PromptCraft-AI
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
```
Then run:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📸 Screenshots

<p align="center">
  <img src="screenshots/chat-dashboard.png" width="45%" alt="Chat Dashboard" />
  <img src="screenshots/login.png" width="45%" alt="Login Page" />
</p>

## 📝 What I Learned Building This

- Managing complex, real-time state in React for live chat updates
- Implementing secure authentication flows in a MERN environment
- Integrating a third-party AI API and structuring prompts to get better model output
- Designing NoSQL schemas for relational-feeling data (users to chats) in MongoDB

## 🤝 Contact

**Aryan Chauhan**
Galgotias University — Full-Stack Web Development (MERN) | Java DSA
GitHub: https://github.com/codedByAryan

If you find this project useful, feel free to ⭐ the repo!