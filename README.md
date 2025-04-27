<h1 align="center">📚 NITSRI Alumni Portal</h1>

<p align="center">
A full-stack web application for managing and showcasing the alumni network of NIT Srinagar.<br/>
Built with <strong>React (Vite)</strong> for the frontend and <strong>Node.js (Express)</strong> for the backend.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel" />
</p>

---

## 📑 Table of Contents

- [📂 Project Structure](#-project-structure)
- [🚀 Features](#-features)
- [⚙️ Tech Stack](#-tech-stack)
- [🔥 Local Setup Guide](#-local-setup-guide)
- [📦 Deployment](#-deployment)
- [🙌 Contributions](#-contributions)
- [🧑‍💻 Developer](#-developer)
- [✨ Final Thanks](#-final-thanks)

---

## 📂 Project Structure

```
End_Semester_Project/
├── admin/     --> Frontend (React + Vite)
├── src/       --> Backend (Node.js + Express + MongoDB)
├── README.md
└── package.json
```

---

## 🚀 Features

- 🔐 **User Authentication** (Sign Up, Sign In, Verify Email, Forgot Password)
- 🎓 **Alumni Records Management**
- 📢 **Event Listings and Updates**
- ✨ **Testimonials & Notable Alumni Highlights**
- 📑 **Job and Internship Listings**
- 🖼️ **Photo Gallery**
- 📩 **Feedback and Contact Forms**
- 🎯 **Admin Dashboard** for managing all activities

---

## ⚙️ Tech Stack

**Frontend (admin/):**
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 📡 Axios
- 🧭 React Router
- ☁️ Appwrite SDK

**Backend (src/):**
- 🖥️ Node.js
- 🚀 Express.js
- 🛢️ MongoDB + Mongoose
- 📑 Google Sheets API
- ☁️ Appwrite Integration
- 🚀 Vercel Deployment

---

## 🔥 Local Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/saurav-nit-srinagar/NITSRI_ALUMNI_PORTAL.git
cd NITSRI_ALUMNI_PORTAL
```

---

### 2. Set up Backend (Server)

```bash
cd src
npm install
```

🔵 Create a `.env` file inside `src/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

👉 Then run:

```bash
npm run dev
```

✅ Server will start on [http://localhost:5000](http://localhost:5000)

---

### 3. Set up Frontend (Client)

```bash
cd ../admin
npm install
npm run dev
```

✅ Frontend will start on [http://localhost:5173](http://localhost:5173)

---

## 📦 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com/)
- **Backend**: Deployed on [Render](https://render.com/) or [Vercel](https://vercel.com/)

---

## 🙌 Contributions

🎯 Feel free to **fork** the project and **submit pull requests**!  
💡 Suggestions, improvements, and collaborations are highly welcome.

---

## 🧑‍💻 Developer

- **Saurav Kumar** – [GitHub Profile](https://github.com/saurav-nit-srinagar)

---

## ✨ Final Thanks

<h3 align="center">✨ Thank you for checking out NITSRI Alumni Portal! ✨</h3>
