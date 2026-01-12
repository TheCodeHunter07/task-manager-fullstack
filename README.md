# 📝 Task Manager – Full Stack Application

A full-stack Task Manager web application built using **Node.js, Express, MongoDB, and Vanilla JavaScript**.  
It allows users to register, login, and manage their tasks efficiently.

---

## 🚀 Features

- User Authentication (Register & Login)
- Secure JWT-based authentication
- Create, view, update, and delete tasks
- Mark tasks as completed
- Filter tasks (All / Completed / In-Progress)
- Task priority & due date support
- MongoDB Atlas integration
- Environment variable security using `.env`

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcrypt.js

---

## 📂 Project Structure

task-manager-fullstack/
│
├── client/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── server/
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── taskRoutes.js
│ ├── models/
│ │ ├── Account.js
│ │ └── Task.js
│ ├── server.js
│ └── .env (ignored)
│
├── .gitignore
└── README.md


---

## ⚙️ Environment Setup

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

▶️ How to Run the Project
Backend
cd server
npm install
node server.js

Frontend

Open client/index.html using Live Server or directly in browser.



🔐 Security Notes

MongoDB credentials are stored securely using environment variables

.env file is ignored using .gitignore

JWT tokens protect private routes



📌 Future Improvements

React frontend

Task categories

User profile page

Deployment (Render / Netlify)

👤 Author

Sumit
Aspiring Full Stack Developer 🚀