import { Link } from 'react-router-dom'

function RegionCard({ region, image, attractionCount }) {
  return (
    <Link className="region-card" to={`/region/${region}`}>
      <img src={image} alt={`${region} travel preview`} />
      <div className="region-card-content">
        <h2>{region}</h2>
        <p>{attractionCount} attractions</p>
      </div>
    </Link>
  )
}

export default RegionCard
