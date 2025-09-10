import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initiatePayment } from "../api/payments";

function Checkout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: "", amount: "", listingId: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await initiatePayment(form, token);
      setSuccess("STK Push sent. Complete payment on your phone.");
      setError("");
      console.log(res.data);
      setTimeout(() => navigate("/transactions"), 3000);
    } catch (err) {
      setError("Payment initiation failed");
      setSuccess("");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Checkout</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="phone"
          placeholder="M-Pesa Phone Number (2547...)"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          name="amount"
          placeholder="Amount (KES)"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          name="listingId"
          placeholder="Listing ID"
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100">Pay Now</button>
      </form>
    </div>
  );
}

export default Checkout;
