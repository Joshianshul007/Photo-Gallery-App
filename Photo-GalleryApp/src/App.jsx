import { useState, useCallback } from 'react'
import Gallery from './components/Gallery'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text !text-transparent">Photo Gallery</h1>
          
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search by author name..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-700"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>

      <Gallery searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  )
}

export default App
