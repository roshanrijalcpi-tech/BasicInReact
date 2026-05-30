import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // LOGIN STATES
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmailError, setLoginEmailError] = useState(false);

  // SIGNUP STATES
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupEmailError, setSignupEmailError] = useState(false);

  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setLoginEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // You can expand this if needed
  };

  // Handle Login Email Change
  const handleLoginEmailChange = (e) => {
    const value = e.target.value;
    setLoginEmail(value);
    setLoginEmailError(value.length > 0 && !validateEmail(value));
    setMessage("");
  };

  // Handle Signup Email Change
  const handleSignupEmailChange = (e) => {
    const value = e.target.value;
    setSignupEmail(value);
    setSignupEmailError(value.length > 0 && !validateEmail(value));
    setMessage("");
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!validateEmail(loginEmail)) {
      setMessage("❌ Please enter a valid email");
      setLoginEmailError(true);
      setIsLoading(false);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    setTimeout(() => {
      if (storedUser && loginEmail === storedUser.email && loginPassword === storedUser.password) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", loginEmail);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        setIsLoggedIn(true);
      } else {
        setMessage("❌ Invalid email or password");
      }
      setIsLoading(false);
    }, 800);
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

    if (signupPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    const user = { email: signupEmail, password: signupPassword };
    localStorage.setItem("user", JSON.stringify(user));

    setMessage("✅ Account created successfully!");

    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
    setSignupEmailError(false);

    setTimeout(() => {
      setActiveTab("login");
      setMessage("");
    }, 1500);
  };

  // PORTFOLIO PAGE (Shown after successful login)
  if (isLoggedIn) {
    return (
      <div className="portfolio-container">
        <div className="hero">
          <h1>Hi, I'm Roshan Rijal </h1>
          <p>Web Developer | React Enthusiast | Creative Coder</p>
          <button className="btn" onClick={() => window.open("#", "_blank")}>
            Download Resume
          </button>
        </div>

        <div className="section">
          <h2>About Me</h2>
          <p>
            Passionate web developer who loves building beautiful and functional 
            user interfaces. Currently learning full-stack development and creating 
            modern web experiences.
          </p>
        </div>

        <div className="section">
          <h2>Projects</h2>
          <p>Coming Soon - Portfolio Projects will be added here...</p>
        </div>

        <div className="section">
          <h2>Skills</h2>
          <p>React • JavaScript • CSS • HTML • Firebase • Tailwind</p>
        </div>

        <button 
          className="logout-btn"
          onClick={() => setIsLoggedIn(false)}
          style={{ marginTop: "40px" }}
        >
          Logout
        </button>
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
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => { setActiveTab("login"); setMessage(""); }}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => { setActiveTab("signup"); setMessage(""); }}
          >
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

            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
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

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}