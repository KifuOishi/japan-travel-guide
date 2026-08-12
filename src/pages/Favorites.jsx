import { Link } from 'react-router-dom'
import AttractionCard from '../components/AttractionCard.jsx'
import { useFavorites } from '../hooks/useFavorites.js'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <section className="page">
      <div className="page-heading-row">
        <div>
          <p className="eyebrow">Saved places</p>
          <h1>Favorites</h1>
        </div>
        <Link className="primary-link" to="/">
          Browse Regions
        </Link>
      </div>

      {favorites.length > 0 ? (
        <div className="attraction-grid">
          {favorites.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Save attractions from a region page or detail page.</p>
        </div>
      )}
    </section>
  )
}

export default Favorites
