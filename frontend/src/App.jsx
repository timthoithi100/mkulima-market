import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Listings from "./pages/Listings";
import ListingForm from "./pages/ListingForm";
import MyListings from "./pages/MyListings";
import Chat from "./pages/Chat";
import Checkout from "./pages/Checkout";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import NotificationBell from "./components/NotificationBell";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Mkulima Market</Link>
        <div className="ms-auto d-flex align-items-center">
          <NotificationBell />
          <Link className="btn btn-outline-light ms-2" to="/login">Login</Link>
          <Link className="btn btn-primary ms-2" to="/signup">Sign Up</Link>
          <Link className="btn btn-warning ms-2" to="/admin">Admin</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Listings />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<ListingForm />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/chat/:id" element={<ChatWrapper />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function ChatWrapper() {
  const { id } = window.location.pathname.split("/").slice(-1)[0];
  return <Chat receiverId={id} />;
}

export default App;
