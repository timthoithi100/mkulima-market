import { useEffect, useState } from "react";
import { getListings } from "../api/listings";

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings()
      .then((res) => setListings(res.data))
      .catch(() => setListings([]));
  }, []);

  return (
    <div>
      <h2>Available Livestock</h2>
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
                <p className="card-text">
                  Price: KES {l.price} <br />
                  Age: {l.animal?.age} months
                </p>
                <p className="card-text">
                  <small className="text-muted">Seller: {l.seller?.firstName}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
