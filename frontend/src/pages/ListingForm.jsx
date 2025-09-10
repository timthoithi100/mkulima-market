import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../api/listings";

function ListingForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    animalId: "",
    price: "",
    imageUrl: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createListing(form, token);
      navigate("/my-listings");
    } catch (err) {
      setError("Failed to create listing");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Create Listing</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="animalId"
          placeholder="Animal ID"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          name="price"
          placeholder="Price (KES)"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <button className="btn btn-primary w-100">Create Listing</button>
      </form>
    </div>
  );
}

export default ListingForm;
