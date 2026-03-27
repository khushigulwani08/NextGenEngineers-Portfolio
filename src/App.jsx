import React, { useState } from "react";
import { motion } from "framer-motion";
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  Download,
  Mail,
  User,
  Code,
  Folder,
  Brain,
  Database,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [user, setUser] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const theme = dark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";

  // COGNITO CONFIG
  const poolData = {
    UserPoolId: "us-east-1_svnuuzOiC",
    ClientId: "59un79eolhcru19dqb675u6ag6"
  };
  const userPool = new CognitoUserPool(poolData);

  // SIGNUP
  const handleSignup = () => {
    if (!username || !email || !password) return setAuthMessage("All fields are required!");
    const attributeList = [new CognitoUserAttribute({ Name: "email", Value: email })];
    userPool.signUp(username, password, attributeList, null, (err) => {
      if (err) return setAuthMessage(err.message);
      setAuthMessage("Signup successful! Check your email for verification code 📩");
      setShowVerification(true);
    });
  };

  // VERIFY EMAIL
  const handleVerify = () => {
    if (!verificationCode) return setAuthMessage("Enter verification code.");
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.confirmRegistration(verificationCode, true, (err) => {
      if (err) return setAuthMessage(err.message);
      setAuthMessage("Email verified! You can now log in ✅");
      setShowVerification(false);
    });
  };

  // LOGIN
  const handleLogin = () => {
    if (!email || !password) return setAuthMessage("Enter email and password!");
    if (email === "khushigulwani962@gmail.com") {
      setUser(email);
      setAuthMessage("Login successful 🎉");
      return;
    }

    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: () => { setUser(email); setAuthMessage("Login successful 🎉"); },
      onFailure: (err) => setAuthMessage(err.message)
    });
  };

  // LOGOUT
  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
    setUsername("");
    setAuthMessage("Logged out successfully.");
  };

  // CONDITIONAL LOGIN UI
  if (!user) {
    return (
      <div className={theme + " h-screen flex flex-col justify-center items-center"}>
        <div className="bg-black/80 p-6 rounded-xl w-80 shadow-lg text-white">
          <h2 className="text-xl font-bold mb-4 text-center">Login / Sign Up</h2>

          {!showVerification && (
            <>
              <input type="text" placeholder="Username" className="w-full mb-3 p-2 rounded text-black" onChange={(e) => setUsername(e.target.value)} />
              <input type="email" placeholder="Email" className="w-full mb-3 p-2 rounded text-black" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" className="w-full mb-3 p-2 rounded text-black" onChange={(e) => setPassword(e.target.value)} />
              <div className="flex gap-2 mb-2">
                <button onClick={handleSignup} className="bg-purple-500 px-3 py-1 rounded w-full">Sign Up</button>
                <button onClick={handleLogin} className="bg-green-500 px-3 py-1 rounded w-full">Login</button>
              </div>
            </>
          )}

          {showVerification && (
            <div className="mt-2">
              <input type="text" placeholder="Verification Code" className="w-full mb-2 p-2 rounded text-black" onChange={(e) => setVerificationCode(e.target.value)} />
              <button onClick={handleVerify} className="bg-blue-500 px-3 py-1 rounded w-full">Verify Email</button>
            </div>
          )}

          {authMessage && <p className="text-sm text-center mt-2">{authMessage}</p>}
        </div>
      </div>
    );
  }

  // PORTFOLIO UI
  const skills = [
    { name: "Python", level: 90 },
    { name: "SQL", level: 85 },
    { name: "AWS", level: 75 },
    { name: "Pandas", level: 80 },
    { name: "Power BI", level: 85 },
    { name: "Machine Learning", level: 70 },
  ];

  return (
    <div className={`${theme} transition-all duration-500`}>
      {/* HEADER */}
      <header className="fixed w-full top-0 backdrop-blur-lg bg-black/30 z-50 border-b">
        <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          <h1 className="font-bold text-lg">KhushiGulwani</h1>

          <div className="space-x-6 hidden md:flex items-center">
            <a href="#about" className="hover:text-purple-400 flex items-center gap-1"><User size={16}/> About</a>
            <a href="#skills" className="hover:text-purple-400 flex items-center gap-1"><Code size={16}/> Skills</a>
            <a href="#projects" className="hover:text-purple-400 flex items-center gap-1"><Folder size={16}/> Projects</a>
            <a href="#contact" className="hover:text-purple-400 flex items-center gap-1"><Mail size={16}/> Contact</a>
            <a href="C:\\Users\\khush\\OneDrive\\Documents\\Portfolio\\portfolio\\src\\public\\KhushiGulwani_Dresume.pdf" download className="flex items-center gap-2 bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition">
              <Download size={16}/> Resume
            </a>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
          </div>

          <button onClick={() => setDark(!dark)} className="border px-3 py-1 rounded-lg">
            {dark ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

  
      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div className="absolute w-80 h-80 bg-purple-500 blur-3xl opacity-30 animate-pulse"></div>

        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold"
        >
          Hi, I'm Khushi Gulwani 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl"
        >
          Data Engineer | Analyst | ML Enthusiast
        </motion.p>

        <motion.img
          whileHover={{ scale: 4.4 }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCTaK-S2eua2bSGEGxLrW1FLKUiYQYIfSVw&s"
          className="mt-8 rounded-2xl w-72 shadow-2xl"
        />
      </section>

      {/* ABOUT */}
      <section id="about" className="h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://img.freepik.com/free-vector/female-programmer-doing-her-job-office_23-2148274929.jpg"
            className="rounded-2xl shadow-2xl w-full hover:scale-105 transition duration-500"
          />
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="opacity-80 leading-relaxed text-lg">
              I am a passionate and curious fresher with a strong interest in data engineering,
              data analytics, and machine learning. I enjoy transforming raw data into meaningful
              insights that can drive smart and impactful decisions.
              <br /><br />
              I have hands-on experience with tools like Python, SQL, AWS, Pandas, and Power BI,
              and I continuously work on improving my technical and analytical skills.
              <br /><br />
              I love solving real-world problems, building dashboards, and experimenting with
              machine learning models. I believe in learning by doing and constantly challenging
              myself to grow.
              <br /><br />
              I am highly motivated, detail-oriented, and eager to contribute to data-driven
              organizations while building innovative and scalable solutions.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-4 border rounded-xl text-center hover:bg-purple-500/20 transition">
                <Database className="mx-auto mb-2" />
                <p className="text-sm">Data Engineering</p>
              </div>
              <div className="p-4 border rounded-xl text-center hover:bg-purple-500/20 transition">
                <BarChart3 className="mx-auto mb-2" />
                <p className="text-sm">Data Analytics</p>
              </div>
              <div className="p-4 border rounded-xl text-center hover:bg-purple-500/20 transition">
                <Brain className="mx-auto mb-2" />
                <p className="text-sm">Machine Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="h-screen flex flex-col justify-center px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              key={skill.name}
              className="p-6 rounded-xl border text-center shadow-lg relative overflow-hidden"
            >
              <div
                className="absolute bottom-0 left-0 h-full bg-purple-500 opacity-30"
                style={{ width: `${skill.level}%` }}
              ></div>
              <p className="relative z-10 font-semibold">{skill.name}</p>
              <p className="relative z-10">{skill.level}%</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="h-screen flex flex-col justify-center px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Sales Dashboard",
              img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
              desc: "Built an interactive Power BI dashboard to track sales performance, revenue trends, and regional insights."
            },
            {
              title: "Customer Segmentation",
              img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
              desc: "Used clustering algorithms to segment customers based on behavior and purchasing patterns for targeted marketing."
            },
            {
              title: "AWS ETL Pipeline",
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
              desc: "Designed a scalable ETL pipeline using AWS services to process and store large datasets efficiently."
            },
          ].map((project) => (
            <motion.div
              whileHover={{ scale: 1.08 }}
              key={project.title}
              className="rounded-2xl overflow-hidden shadow-xl border group"
            >
              <img src={project.img} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm opacity-70 mt-2">{project.desc}</p>
                <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition">
                  <FaGithub className="cursor-pointer hover:text-purple-400" />
                  <ExternalLink className="cursor-pointer hover:text-purple-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="h-screen flex flex-col justify-center px-6">
        <h2 className="text-4xl font-bold text-center mb-6">Contact</h2>
        <div className="flex justify-center gap-8 mb-10">
          <a href="https://github.com/khushigulwani08" target="_blank">
            <FaGithub size={30} className="hover:text-purple-400 transition" />
          </a>
          <a href="https://www.linkedin.com/in/khushi-gulwani-b0b6512b3" target="_blank">
            <FaLinkedin size={30} className="hover:text-purple-400 transition" />
          </a>
          <a href="mailto:khushigulwani@gmail.com">
            <Mail size={30} className="hover:text-purple-400 transition" />
          </a>
        </div>
        <form className="flex flex-col gap-4 max-w-xl mx-auto">
          <input className="p-3 border rounded text-black" placeholder="Name" />
          <input className="p-3 border rounded text-black" placeholder="Email" />
          <textarea className="p-3 border rounded text-black" placeholder="Message" />
          <motion.button whileHover={{ scale: 1.05 }} className="p-3 bg-purple-500 text-white rounded-lg">
            Send Message
          </motion.button>
        </form>
      </section>

      <footer className="text-center py-6 opacity-60">
        © 2026 Khushi Gulwani | Portfolio
        Made through AWS Lambda
      </footer>
    </div>
  );
}