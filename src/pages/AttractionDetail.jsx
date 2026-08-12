import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton.jsx";

const fallbackImage =
  "https://placehold.co/1200x700/f4f6f8/0f2742?text=Japan+Attraction";

function AttractionDetail() {
  const { attractionId } = useParams();

  const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://japan-travel-guide-53426-default-rtdb.firebaseio.com/attractions.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch attraction");
        }

        return response.json();
      })
      .then((data) => {
        const loadedAttractions = [];

        for (const key in data) {
          loadedAttractions.push({
            firebaseId: key,
            ...data[key],
          });
        }

        setAttractions(loadedAttractions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const attraction = attractions.find((item) => item.id === attractionId);

  if (isLoading) {
    return (
      <section className="page">
        <p>Loading attraction...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page empty-state">
        <h1>Something went wrong</h1>
        <p>{error}</p>

        <Link className="primary-link" to="/">
          Back to Home
        </Link>
      </section>
    );
  }

  if (!attraction) {
    return (
      <section className="page empty-state">
        <h1>Attraction not found</h1>
        <p>This attraction could not be found in the database.</p>

        <Link className="primary-link" to="/">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <img
        className="detail-image"
        src={attraction.image || fallbackImage}
        alt={attraction.name}
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
      />

      <div className="detail-content">
        <div className="detail-heading">
          <div>
            <p className="eyebrow">{attraction.region}</p>
            <h1>{attraction.name}</h1>
          </div>

          <FavoriteButton attraction={attraction} />
        </div>

        <p className="detail-description">{attraction.detailedDescription}</p>

        <dl className="detail-list">
          <div>
            <dt>Location</dt>
            <dd>{attraction.location}</dd>
          </div>

          <div>
            <dt>Hours</dt>
            <dd>{attraction.hours}</dd>
          </div>

          <div>
            <dt>Admission Price</dt>
            <dd>{attraction.price}</dd>
          </div>

          <div>
            <dt>Access</dt>
            <dd>{attraction.access}</dd>
          </div>
        </dl>

        <Link className="primary-link" to={`/region/${attraction.region}`}>
          Back to {attraction.region}
        </Link>
      </div>
    </section>
  );
}

export default AttractionDetail;
