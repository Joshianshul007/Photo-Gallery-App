import { useState, useEffect } from 'react'
import './App.css'

function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {!loaded && <div className="absolute inset-0 shimmer-placeholder" />}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  )
}

function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30')
        if (!response.ok) {
          throw new Error('Failed to fetch photos')
        }
        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-6">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-bold tracking-tight m-0 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text !text-transparent">Photo Gallery</h1>
        </div>
      </header>

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
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white overflow-hidden flex flex-col group">
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                   <LazyImage 
                    src={photo.download_url} 
                    alt={`Photo by ${photo.author}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-900 font-semibold truncate mr-2">{photo.author}</h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none" aria-label="Like photo">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
