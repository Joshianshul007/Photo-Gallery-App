import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white overflow-hidden flex flex-col group">
                <div className="aspect-square overflow-hidden bg-gray-200 relative">
                   <img 
                    src={photo.download_url} 
                    alt={`Photo by ${photo.author}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-gray-900 font-semibold truncate mb-2">{photo.author}</h3>
                  <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
                    <span>{photo.width} × {photo.height}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white p-6 text-center text-sm text-gray-500">
        <p>© 2026 Photo Gallery App. Built with React + Vite + Tailwind CSS</p>
      </footer>
    </div>
  )
}

export default App
