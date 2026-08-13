import { useEffect, useState } from "react";
import RegionCard from "../components/RegionCard.jsx";
import "./Home.css";

const regions = [
  {
    name: "Tokyo",
    image: "/Image/tokyo.jpg",
  },
  {
    name: "Kyoto",
    image: "/Image/kyoto.jpg",
  },
  {
    name: "Osaka",
    image: "/Image/osaka.jpg",
  },
  {
    name: "Fukuoka",
    image: "/Image/fukuoka.jpg",
  },
  {
    name: "Hokkaido",
    image: "/Image/hokkaido.jpg",
  },
];

function Home() {
  const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://japan-travel-guide-53426-default-rtdb.firebaseio.com/attractions.json",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch attractions: ${response.status}`);
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
        console.error("Firebase error:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="page">
        <p>Loading regions...</p>
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

  return (
    <section className="page">
      <div className="page-intro">
        <p className="eyebrow">Japan travel planner</p>

        <h1>Choose a region to explore</h1>

        <p>
          Browse popular attractions by region and save your favorite places for
          later.
        </p>
      </div>

      <div className="region-grid">
        {regions.map((region) => {
          const regionAttractions = attractions.filter(
            (attraction) => attraction.region === region.name,
          );

          return (
            <RegionCard
              key={region.name}
              region={region.name}
              image={region.image}
              attractionCount={regionAttractions.length}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Home;
