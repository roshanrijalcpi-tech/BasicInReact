import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./ForLoginForm/Login";
import Signup from "./ForLoginForm/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;