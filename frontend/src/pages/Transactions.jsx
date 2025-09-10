import { useEffect, useState } from "react";
import { getTransactions } from "../api/payments";

function Transactions() {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions(token)
      .then((res) => setTransactions(res.data))
      .catch(() => setTransactions([]));
  }, [token]);

  return (
    <div className="col-md-8 offset-md-2">
      <h2>My Transactions</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>KES {t.amount}</td>
              <td>
                <span
                  className={`badge ${
                    t.status === "completed"
                      ? "bg-success"
                      : t.status === "failed"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {t.status}
                </span>
              </td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
