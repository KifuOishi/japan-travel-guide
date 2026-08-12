import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const FavoritesContext = createContext(null);

function loadStoredFavorites() {
  try {
    const storedFavorites = localStorage.getItem("favoriteAttractions");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadStoredFavorites);

  useEffect(() => {
    localStorage.setItem("favoriteAttractions", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((attraction) => {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (favorite) => favorite.id === attraction.id,
      );

      if (alreadySaved) {
        return currentFavorites;
      }

      return [...currentFavorites, attraction];
    });
  }, []);

  const removeFavorite = useCallback((attractionId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== attractionId),
    );
  }, []);

  const isFavorite = useCallback(
    (attractionId) =>
      favorites.some((favorite) => favorite.id === attractionId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (attraction) => {
      if (isFavorite(attraction.id)) {
        removeFavorite(attraction.id);
      } else {
        addFavorite(attraction);
      }
    },
    [addFavorite, isFavorite, removeFavorite],
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
    }),
    [addFavorite, favorites, isFavorite, removeFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
