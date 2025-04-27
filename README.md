# 📚 NITSRI Alumni Portal

A full-stack web application for managing and showcasing the alumni network of NIT Srinagar.  
Built with **React (Vite)** for the frontend and **Node.js (Express)** for the backend.

---

## 📂 Project Structure

```
End_Semester_Project/
├── admin/     --> Frontend (React + Vite)
├── src/       --> Backend (Node.js + Express + MongoDB)
├── README.md
├── package.json
├── vercel.json
└── subscriptionModel.js
```

---

## 🚀 Features

- 🔐 User Authentication (Sign Up, Sign In, Verify Email, Forgot Password)
- 🎓 Alumni Records Management
- 📢 Event Listings and Updates
- ✨ Testimonials & Notable Alumni Highlights
- 📑 Job and Internship Listings
- 🖼️ Photo Gallery
- 📩 Feedback and Contact Forms
- 🎯 Admin Dashboard for managing all activities

---

## ⚙️ Tech Stack

**Frontend (admin/):**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router
- Appwrite SDK (for authentication and storage)

**Backend (src/):**
- Node.js
- Express.js
- MongoDB + Mongoose
- Google Sheets API (for importing alumni data)
- Appwrite Integration
- Vercel Deployment

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

🔵 Create a `.env` file in `src/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

👉 Then run:

```bash
npm run dev
```

✅ Server will start on: [http://localhost:5000](http://localhost:5000)

---

### 3. Set up Frontend (Client)

```bash
cd ../admin
npm install
npm run dev
```

✅ Frontend will start on: [http://localhost:5173](http://localhost:5173)

---

## 📦 Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render / Vercel

---

## 🙌 Contributions

Feel free to fork the project and submit pull requests!  
Suggestions, improvements, and collaborations are highly welcome.

---

## 🧑‍💻 Developer

- **Saurav Kumar** – [GitHub Profile](https://github.com/saurav-nit-srinagar)

---

# ✨ Thank you for checking out NITSRI Alumni Portal! ✨
