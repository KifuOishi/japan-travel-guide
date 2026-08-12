import RegionCard from '../components/RegionCard.jsx'
import attractions from '../data/attractions.json'

const regions = ['Tokyo', 'Kyoto', 'Osaka', 'Fukuoka', 'Hokkaido']

function Home() {
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
            (attraction) => attraction.region === region,
          )
          const image = regionAttractions[0]?.image

          return (
            <RegionCard
              key={region}
              region={region}
              image={image}
              attractionCount={regionAttractions.length}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Home
