import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../api/notifications";

function Notifications() {
  const token = localStorage.getItem("token");
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = () => {
    getNotifications(token).then((res) => setNotifications(res.data));
  };

  const handleMarkRead = async (id) => {
    await markAsRead(id, token);
    loadNotifications();
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="col-md-8 offset-md-2">
      <h2>Notifications</h2>
      <ul className="list-group">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              n.isRead ? "list-group-item-light" : "list-group-item-warning"
            }`}
          >
            <span>{n.message}</span>
            {!n.isRead && (
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleMarkRead(n.id)}
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
