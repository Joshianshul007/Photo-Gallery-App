import { useReducer, useEffect, useMemo, useCallback } from 'react'
import '../styles/App.css'
import useFetchPhotos from '../hooks/useFetchPhotos'

const FAVOURITES_KEY = 'photo_gallery_favourites'

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      if (state.includes(action.id)) {
        return state.filter(id => id !== action.id)
      } else {
        return [...state, action.id]
      }
    case 'SET_FAVOURITES':
      return action.payload
    default:
      return state
  }
}

function Gallery({ searchTerm, setSearchTerm }) {
  const { photos, loading, error } = useFetchPhotos()
  
  const [likedPhotos, dispatch] = useReducer(favouritesReducer, [], () => {
    const saved = localStorage.getItem(FAVOURITES_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(likedPhotos))
  }, [likedPhotos])

  const toggleLike = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => 
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [photos, searchTerm])

  return (
    <main className="flex-grow max-w-6xl mx-auto w-full p-6">
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-600 font-medium text-lg">Loading amazing photos...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-4 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">Error: {error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-white overflow-hidden flex flex-col group">
              <div className="aspect-square overflow-hidden bg-gray-100 relative">
                <img 
                  src={photo.download_url} 
                  alt={`Photo by ${photo.author}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-900 font-semibold truncate mr-2">{photo.author}</h3>
                  <button 
                    onClick={() => toggleLike(photo.id)}
                    className="text-xl transition-transform active:scale-90 hover:scale-110 focus:outline-none"
                  >
                    {likedPhotos.includes(photo.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No photos found for "{searchTerm}"</p>
        </div>
      )}
    </main>
  )
}

export default Gallery
