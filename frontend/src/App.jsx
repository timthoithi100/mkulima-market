import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Mkulima Market</Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/signup">Sign Up</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h1>Welcome to Mkulima Market</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
