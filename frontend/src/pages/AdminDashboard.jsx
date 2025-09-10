import { useEffect, useState } from "react";
import {
  getAllUsers,
  getAllListings,
  getAllTransactions,
  sendBroadcast
} from "../api/admin";

function AdminDashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [broadcast, setBroadcast] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getAllUsers(token).then((res) => setUsers(res.data));
    getAllListings(token).then((res) => setListings(res.data));
    getAllTransactions(token).then((res) => setTransactions(res.data));
  }, [token]);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    await sendBroadcast(broadcast, token);
    setSuccess("Broadcast sent successfully!");
    setBroadcast("");
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {success && <div className="alert alert-success">{success}</div>}

      <section className="mb-5">
        <h4>Broadcast Notification</h4>
        <form onSubmit={handleBroadcast} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={broadcast}
            placeholder="Message to all users"
            onChange={(e) => setBroadcast(e.target.value)}
          />
          <button className="btn btn-warning">Send</button>
        </form>
      </section>

      <section className="mb-5">
        <h4>Users</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-5">
        <h4>Listings</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id}>
                <td>{l.title}</td>
                <td>KES {l.price}</td>
                <td>{l.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h4>Transactions</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>KES {t.amount}</td>
                <td>{t.status}</td>
                <td>{t.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;
