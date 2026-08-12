import { useNavigate } from 'react-router-dom'
import FavoriteButton from './FavoriteButton.jsx'
import './AttractionCard.css'

const fallbackImage =
  'https://placehold.co/900x600/f4f6f8/0f2742?text=Japan+Attraction'

function AttractionCard({ attraction }) {
  const navigate = useNavigate()

  function openDetails() {
    navigate(`/attraction/${attraction.id}`)
  }

  function handleImageError(event) {
    event.currentTarget.src = fallbackImage
  }

  return (
    <article
      className="attraction-card"
      onClick={openDetails}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          openDetails()
        }
      }}
      role="button"
      tabIndex="0"
    >
      <img
        src={attraction.image || fallbackImage}
        alt={attraction.name}
        onError={handleImageError}
      />
      <div className="attraction-card-content">
        <div>
          <p className="eyebrow">{attraction.region}</p>
          <h2>{attraction.name}</h2>
          <p>{attraction.description}</p>
        </div>
        <div className="card-actions">
          <button className="details-button" type="button" onClick={openDetails}>
            View Details
          </button>
          <FavoriteButton attraction={attraction} />
        </div>
      </div>
    </article>
  )
}

export default AttractionCard
