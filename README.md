🚀 PromptCraft AI – Intelligent Chat Application
Hi there! 👋 I'm a Computer Science student passionate about building full-stack applications. This project is a ChatGPT-inspired AI chat interface built using the MERN stack.

The goal of PromptCraft AI is to provide a seamless, intelligent chat experience with added utilities like prompt enhancement and automatic language translation/refinement.

🌟 Key Features
🔐 Secure Authentication: Full user flow with Registration and Login to keep your chats private.

💬 Modern Chat Interface: A sleek, responsive UI that mimics the ChatGPT experience for a familiar feel.

🧠 Brains by OpenRouter: Integrated with OpenRouter API to fetch high-quality AI responses.

✨ Smart Prompt Enhancer: Includes a custom feature that takes "lazy" prompts and expands them into detailed, high-quality instructions for the AI.

🌐 Language Bridge: Automatically converts Hindi or Hinglish prompts into professional English to ensure the AI provides the most accurate results.

📜 Persistent Memory: Your conversations aren't lost on refresh. All chat history is stored securely in MongoDB.

🗂️ Chat Management: Easily organize your thoughts with a sidebar for multiple chat sessions and the ability to delete old conversations.

🎨 UI/UX: Built with Tailwind CSS for a clean, modern look with smooth scrolling and mobile responsiveness.

🛠️ Tech Stack
Frontend
React.js: For building a dynamic and reactive user interface.

Tailwind CSS: For styling with a utility-first approach.

Axios: For handling API requests to the backend.

Backend
Node.js & Express.js: Powering the server-side logic and API routing.

MongoDB & Mongoose: NoSQL database used to store user profiles and chat threads.

AI & Integration
OpenRouter API: Providing access to various LLMs.

JWT (JSON Web Tokens): Used for secure user authentication.

📂 Project Structure
Plaintext
PromptCraft-AI/
├── backend/
│   ├── models/        # Mongoose schemas (User, Chat)
│   ├── routes/        # API endpoints (Auth, AI, Chats)
│   ├── middleware/    # Auth verification
│   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/# Reusable UI elements (Sidebar, Message, Input)
│   │   ├── pages/     # Login, Register, Chat Dashboard
│   │   └── App.js     # Routing and State management
└── README.md
🚀 Getting Started
To get this project running locally, follow these steps:

1. Clone the repository
Bash
git clone https://github.com/your-username/PromptCraft-AI.git
cd PromptCraft-AI
2. Backend Setup
Navigate to the backend folder.

Create a .env file and add your MONGO_URI, JWT_SECRET, and OPENROUTER_API_KEY.

Run npm install and then npm start.

3. Frontend Setup
Navigate to the frontend folder.

Run npm install.

Run npm start to launch the application in your browser.

📝 Learning Outcomes
Building this project helped me master:

Managing complex state in React (handling real-time chat updates).

Implementing secure Authentication flows in a MERN environment.

Integrating third-party AI APIs and structuring prompts for better output.

Designing database schemas that handle relational data (Users to Chats) in a NoSQL database.

🤝 Contact
If you have any questions or just want to talk about Web Dev/AI, feel free to reach out!

Name: Aryan Chauhan

University: Galgotias University

Focus: Full-Stack Web Development (MERN) | Java DSA

If you liked this project, feel free to ⭐ the repo!
