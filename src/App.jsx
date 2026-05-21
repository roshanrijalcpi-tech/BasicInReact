import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Button from "./components/Button";

function App() {
  const userName = "Roshan";

  return (
    <div>
      {/* Header Component */}
      <Header title="My React App" />

      {/* Paragraph */}
      <p>Welcome to React Learning.</p>

      {/* Props Example */}
      <h2>Hello {userName}</h2>

      {/* Card Component */}
      <Card
        name="React Course"
        description="Learning React Components and Props"
      />

      {/* Button Component */}
      <Button text="Click Me I am Here" />

      {/* Image */}
      <img
        src="https://picsum.photos/200"
        alt="Random"
      />

      {/* List Rendering */}
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>React</li>
      </ul>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;