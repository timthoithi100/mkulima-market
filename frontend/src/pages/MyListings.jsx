import { useEffect, useState } from "react";
import { getMyListings, deleteListing } from "../api/listings";

function MyListings() {
  const token = localStorage.getItem("token");
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  const loadListings = () => {
    getMyListings(token)
      .then((res) => setListings(res.data))
      .catch(() => setError("Failed to load listings"));
  };

  const handleDelete = async (id) => {
    try {
      await deleteListing(id, token);
      loadListings();
    } catch {
      setError("Failed to delete listing");
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <div>
      <h2>My Listings</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {listings.map((l) => (
          <div className="col-md-4 mb-3" key={l.id}>
            <div className="card">
              <img
                src={l.imageUrl || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt="Animal"
              />
              <div className="card-body">
                <h5 className="card-title">{l.animal?.type}</h5>
                <p className="card-text">Price: KES {l.price}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(l.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;
