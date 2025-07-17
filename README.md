# SmartResume - AI Resume Assistant 🚀

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

**Elevate your resume to the next level with the power of AI. Get instant analysis, data-driven feedback, and tailor your resume to any job description in seconds.**

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🛠️ Built With](#️-built-with)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Best Practices](#-best-practices)

---

## 📖 About The Project

SmartResume is a full-stack MERN application designed to help job seekers gain a competitive edge. Traditional resume writing is often a guessing game. This tool removes the guesswork by leveraging AI to provide objective, actionable feedback and helps users perfectly align their resume with the specific requirements of a job posting.

---

## ✨ Key Features

-   **Secure User Authentication:** JWT-based login and registration system to keep user data private.
-   **AI-Powered Resume Analysis:** Upload a resume to receive a detailed score breakdown across categories like skills, experience, and formatting, along with a list of pros and cons.
-   **AI-Powered Resume Customization:** Paste a job description to have the AI rewrite and tailor your resume, highlighting relevant keywords and skills.
-   **Personal Profile & History:** A user dashboard to view all past analysis and customization activities.
-   **Professional & Responsive UI:** A clean, modern interface built with Tailwind CSS that works beautifully on all devices.

---

## 🛠️ Built With

This project is built with a modern MERN stack and other leading technologies.

-   **Frontend:** React, Vite, React Router, Axios, Tailwind CSS
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (JWT), bcrypt.js
-   **AI Integration:** OpenRouter API

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* npm
    ```sh
    npm install npm@latest -g
    ```

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/aaditya0004/smart-resume-app.git)
    cd your-repo-name
    ```

2.  **Setup the Backend Server:**
    - Navigate to the server directory: `cd server`
    - Install NPM packages: `npm install`
    - Create a `.env` file and add the required environment variables (see below).
    - Start the server: `npm start`

3.  **Setup the Frontend Client:**
    - Open a new terminal and navigate to the client directory: `cd client`
    - Install NPM packages: `npm install`
    - Create a `.env` file and add the required environment variable.
    - Start the client: `npm run dev`

### Environment Variables

You will need to create a `.env` file in both the `/server` and `/client` directories.

**`server/.env`:**