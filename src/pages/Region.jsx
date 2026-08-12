import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AttractionCard from "../components/AttractionCard.jsx";

function Region() {
  const { regionName } = useParams();

  const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://japan-travel-guide-53426-default-rtdb.firebaseio.com/attractions.json")
      .then((response) => {
        console.log("status:", response.status);
        console.log("url:", response.url);

        if (!response.ok) {
          throw new Error(`Failed to fetch attractions: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Firebase data:", data);

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
        console.error("Firebase error:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const cleanRegionName = regionName || "";

  const regionAttractions = attractions.filter(
    (attraction) =>
      attraction.region.toLowerCase() === cleanRegionName.toLowerCase(),
  );

  if (isLoading) {
    return (
      <section className="page">
        <p>Loading attractions...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page empty-state">
        <h1>Something went wrong</h1>
        <p>{error}</p>
      </section>
    );
  }

  if (regionAttractions.length === 0) {
    return (
      <section className="page empty-state">
        <h1>Region not found</h1>
        <p>Try choosing one of the regions from the home page.</p>

        <Link className="primary-link" to="/">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-heading-row">
        <div>
          <p className="eyebrow">Region</p>
          <h1>{regionAttractions[0].region}</h1>
        </div>

        <Link className="primary-link" to="/">
          All Regions
        </Link>
      </div>

      <div className="attraction-grid">
        {regionAttractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </section>
  );
}

export default Region;
