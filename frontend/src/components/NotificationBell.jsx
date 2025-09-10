import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { getNotifications } from "../api/notifications";

const socket = io("http://localhost:5000");

function NotificationBell() {
  const token = localStorage.getItem("token");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    const userId = JSON.parse(atob(token.split(".")[1])).id;

    // Join user room
    socket.emit("join", userId);

    // Fetch unread notifications
    getNotifications(token).then((res) => {
      const unread = res.data.filter((n) => !n.isRead);
      setCount(unread.length);
    });

    // Listen for new notifications
    socket.on("notification", () => {
      setCount((prev) => prev + 1);
    });

    return () => {
      socket.off("notification");
    };
  }, [token]);

  return (
    <Link to="/notifications" className="btn btn-outline-light position-relative">
      <i className="bi bi-bell"></i>
      {count > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {count}
        </span>
      )}
    </Link>
  );
}

export default NotificationBell;
