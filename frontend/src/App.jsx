import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Mkulima Market</Link>
      </nav>
      <div className="container mt-4">
        <h1>Welcome to Mkulima Market</h1>
        <p>Frontend is running with React + Bootstrap</p>
      </div>
    </Router>
  );
}

export default App;
