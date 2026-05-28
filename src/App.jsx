import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("login");

  // LOGIN STATES
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailError, setLoginEmailError] = useState(false);

  // SIGNUP STATES
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupEmailError, setSignupEmailError] = useState(false);

  // MESSAGE
  const [message, setMessage] = useState("");

  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // PASSWORD SHOW/HIDE
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  // PASSWORD STRENGTH
  const [strength, setStrength] = useState({
    text: "",
    width: "0%",
    color: "red",
    level: 0,
  });

  // PASSWORD STRENGTH CHECK
  useEffect(() => {
    checkPasswordStrength(signupPassword);
  }, [signupPassword]);

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      setStrength({ text: "Weak", width: "33%", color: "#ff4d4d", level: 1 });
    } else if (score <= 3) {
      setStrength({ text: "Medium", width: "66%", color: "#ffaa00", level: 2 });
    } else {
      setStrength({ text: "Strong", width: "100%", color: "#00cc66", level: 3 });
    }
  };

  // EMAIL VALIDATION
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Real-time Email Validation for Login
  const handleLoginEmailChange = (e) => {
    const value = e.target.value;
    setLoginEmail(value);
    setLoginEmailError(value.length > 0 && !validateEmail(value));
  };

  // Real-time Email Validation for Signup
  const handleSignupEmailChange = (e) => {
    const value = e.target.value;
    setSignupEmail(value);
    setSignupEmailError(value.length > 0 && !validateEmail(value));
  };

  // SIGNUP
  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateEmail(signupEmail)) {
      setMessage("❌ Invalid email format");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    if (strength.level < 2) {
      setMessage("❌ Password must be at least Medium strength");
      return;
    }

    const user = { email: signupEmail, password: signupPassword };
    localStorage.setItem("user", JSON.stringify(user));

    setMessage("✅ Account created successfully");

    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
    setSignupEmailError(false);

    setTimeout(() => {
      setActiveTab("login");
      setMessage("");
    }, 1500);
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(loginEmail)) {
      setMessage("❌ Please enter a valid email");
      setLoginEmailError(true);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setMessage("❌ No account found");
      return;
    }

    if (loginEmail === storedUser.email && loginPassword === storedUser.password) {
      setIsLoggedIn(true);
    } else {
      setMessage("❌ Invalid login credentials");
    }
  };

  // MAINTENANCE PAGE
  if (isLoggedIn) {
    return (
      <div className="welcome-page">
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>🔄 Under Maintenance</h1>
          <h2 style={{ color: "#fff", fontSize: "28px", marginBottom: "30px" }}>
            We are updating this page.<br />
            Please wait for 1-2 weeks.
          </h2>
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>

      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="card">

        <div className="tabs">
          <button className={activeTab === "login" ? "active" : ""} onClick={() => { setActiveTab("login"); setMessage(""); }}>
            Login
          </button>
          <button className={activeTab === "signup" ? "active" : ""} onClick={() => { setActiveTab("signup"); setMessage(""); }}>
            Signup
          </button>
        </div>

        {message && <div className="message">{message}</div>}

        {/* LOGIN FORM */}
        <div className={`form-section ${activeTab === "login" ? "show" : "hide"}`}>
          <form onSubmit={handleLogin}>
            <h2>Welcome Back 👋</h2>

            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={handleLoginEmailChange}
              className={loginEmailError ? "error" : ""}
              required
            />

            <div className="password-box">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowLoginPassword(!showLoginPassword)}>
                {showLoginPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>

        {/* SIGNUP FORM */}
        <div className={`form-section ${activeTab === "signup" ? "show" : "hide"}`}>
          <form onSubmit={handleSignup}>
            <h2>Create Account 🚀</h2>

            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={handleSignupEmailChange}
              className={signupEmailError ? "error" : ""}
              required
            />

            <div className="password-box">
              <input
                type={showSignupPassword ? "text" : "password"}
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowSignupPassword(!showSignupPassword)}>
                {showSignupPassword ? "🙈" : "👁"}
              </span>
            </div>

            <div className="strength-container">
              <div className="strength-bar" style={{ width: strength.width, background: strength.color }}></div>
            </div>

            <p style={{ color: strength.color }}>Password Strength: {strength.text}</p>

            <div className="checklist">
              <p className={signupPassword.length >= 8 ? "valid" : ""}>✔ Minimum 8 characters</p>
              <p className={/[A-Z]/.test(signupPassword) && /[a-z]/.test(signupPassword) ? "valid" : ""}>✔ Uppercase & Lowercase</p>
              <p className={/[0-9]/.test(signupPassword) ? "valid" : ""}>✔ Number</p>
              <p className={/[^A-Za-z0-9]/.test(signupPassword) ? "valid" : ""}>✔ Special Character</p>
            </div>

            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}