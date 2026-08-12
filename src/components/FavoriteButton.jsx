import { useFavorites } from '../hooks/useFavorites.js'

function FavoriteButton({ attraction }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(attraction.id)

  function handleClick(event) {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(attraction)
  }

  return (
    <button
      className={saved ? 'favorite-button saved' : 'favorite-button'}
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
    >
      {saved ? 'Remove Favorite' : 'Add Favorite'}
    </button>
  )
}

export default FavoriteButton
