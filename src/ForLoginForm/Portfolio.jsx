// src/components/Portfolio.jsx
import "./Portfolio.css"; // we'll create this too

export default function Portfolio() {
  return (
    <div className="portfolio-container">
      <header className="hero">
        <h1>Hi, I'm [Your Name]</h1>
        <p>Full Stack Developer | Designer | Creator</p>
        <button className="btn">Download Resume</button>
      </header>

      <section className="about">
        <h2>About Me</h2>
        <p>Your short bio here...</p>
      </section>

      <section className="projects">
        <h2>Projects</h2>
        {/* Add your project cards here */}
      </section>

      <section className="skills">
        <h2>Skills</h2>
        {/* Add skill tags */}
      </section>

      <footer>
        <p>© 2026 [Your Name]. All Rights Reserved.</p>
      </footer>
    </div>
  );
}