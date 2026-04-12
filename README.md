# 🌐 Connectly

🚀 **Connectly** is a modern full-stack social platform that enables users to connect, interact, and communicate in real-time. It integrates secure authentication, media uploads, and real-time messaging to deliver a smooth and engaging user experience.

---

## 📌 Features

✨ Key highlights of the project:

* 🔐 User Authentication (JWT-based Login / Signup)
* 👤 User Profile Management
* 🖼️ Image Uploads using Cloudinary
* 💬 Real-time Chat using Socket.IO
* 🟢 Online/Offline User Status
* 🔔 Instant Messaging & Updates
* 🌍 Fully Responsive UI (Mobile + Desktop)
* ⚡ Fast and optimized performance
* 🔄 Dynamic data rendering

---

## 🛠️ Tech Stack

### Frontend:

* ⚛️ React.js
* 🎨 CSS / Bootstrap / Tailwind
* 🧩 JavaScript (ES6+)

### Backend:

* 🟢 Node.js
* 🚀 Express.js

### Database:

* 🍃 MongoDB

### Real-Time Communication:

* 🔌 Socket.IO

### Media Storage:

* ☁️ Cloudinary

### Other Tools:

* 🔧 Git & GitHub
* 📦 npm
* 🌐 REST APIs

---

## 📂 Project Structure

```bash
Connectly/
│── client/          # Frontend (React)
│── server/          # Backend (Node + Express)
│── models/          # MongoDB models
│── routes/          # API routes
│── controllers/     # Business logic
│── socket/          # Socket.IO configuration
│── utils/           # Cloudinary & helpers
│── public/
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Om-prakash001/Connectly.git
cd Connectly
```

### 2️⃣ Install dependencies

#### Frontend:

```bash
cd frontEnd
npm install
```

#### Backend:

```bash
cd backEnd
npm install
```

---

### 3️⃣ Run the project

#### Start backend server:

```bash
cd server
npm run dev
```

#### Start frontend:

```bash
cd client
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 💬 Real-Time Features (Socket.IO)

* Instant messaging between users
* Live user online/offline status
* Real-time updates without page refresh

---

## 🖼️ Media Handling (Cloudinary)

* Upload user profile images
* Store images securely in the cloud
* Optimized image delivery

---

## 📸 Screenshots

*Add screenshots of your UI here*

---

## 🚀 Future Improvements

* 📹 Video calling feature (WebRTC)
* 🔔 Push notifications
* 🧠 AI-based friend suggestions
* 🌐 Deployment (Vercel / Render / AWS)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push and create a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Om Prakash Nayak**

* 🌐 GitHub: https://github.com/Om-prakash001

---

⭐ If you like this project, don’t forget to **star the repo!**
