import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getMessages, sendMessage } from "../api/messages";

const socket = io("http://localhost:5000");

function Chat({ receiverId }) {
  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!receiverId) return;

    getMessages(receiverId, token)
      .then((res) => setMessages(res.data))
      .catch(() => setMessages([]));

    socket.on("new_message", (msg) => {
      if (msg.senderId === receiverId || msg.receiverId === receiverId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [receiverId, token]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await sendMessage({ receiverId, content }, token);
      setMessages((prev) => [...prev, res.data]);
      setContent("");
    } catch (err) {
      console.error("Send failed");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3>Chat</h3>
      <div className="border rounded p-3 mb-3" style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((m) => (
          <div key={m.id} className={`mb-2 ${m.senderId === receiverId ? "text-start" : "text-end"}`}>
            <span className={`badge ${m.senderId === receiverId ? "bg-secondary" : "bg-primary"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-success">Send</button>
      </form>
    </div>
  );
}

export default Chat;
