# Khushi Gulwani Portfolio

This is a **personal portfolio website** built with **React**, showcasing my skills, projects, and contact information. It features **AWS Cognito authentication**, **dark/light theme toggle**, and interactive sections with animations.

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Framer Motion  
- **Authentication:** AWS Cognito (Email verification & login)  
- **Icons & Animations:** Lucide React, React Icons, Framer Motion  
- **Hosting:** Local / Optional deployment on AWS / Netlify / Vercel  

---

## Features

1. **Authentication:**
   - Sign up with username, email, and password.
   - Email verification using Cognito.
   - Login functionality.

2. **Portfolio Sections:**
   - **Hero Section:** Introduction with profile image and role.
   - **About Me:** Personal bio, motivation, and technical interests.
   - **Skills:** Showcasing technical skills with animated progress bars.
   - **Projects:** Interactive cards with project details and links.
   - **Contact:** Links to GitHub, LinkedIn, and a contact form.
   - **Resume Download:** Button to download resume directly.
   - **Dark/Light Mode:** Toggle theme.

3. **Logout:** Button in the header returns the user to the login/signup page.

---

## Project Structure


portfolio/
├── src/
│ ├── App.jsx # Main React component with login & portfolio
│ ├── index.js # React entry point
│ └── assets/ # Images, resume PDF
├── public/
│ └── index.html
├── package.json
└── README.md


---

##  How to Run Locally

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd portfolio
Install dependencies:
npm install
Start the development server:
npm start
Open the app in your browser:
http://localhost:3000
Login:
Use any registered email & password (if using Cognito)

Live Video URL: "https://drive.google.com/file/d/1jMPRA6lauV46dS9Lj1jDQE9hqCZ5JUNM/view?usp=sharing"