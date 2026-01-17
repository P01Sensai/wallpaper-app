import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, Clock, Search } from 'lucide-react';
import { unsplashApi } from '../services/unsplashApi';
import Header from '../components/Header';
import WallpaperCard from '../components/WallpaperCard';
import { FloatingParticles, SearchBar } from '../components/SharedUI';

const SearchPage = ({ initialQuery, username, onLogout, onBack, darkMode, onToggleDarkMode, favorites, onToggleFavorite }) => {
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [size, setSize] = useState('all');
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update query if the parent passes a new one
  useEffect(() => {
    setCurrentQuery(initialQuery);
  }, [initialQuery]);

  // Fetch data whenever currentQuery changes
  useEffect(() => {
    const loadSearchImages = async () => {
      if (!currentQuery) return;
      setLoading(true);
      
      const data = await unsplashApi.searchPhotos(currentQuery, 1, 24);
      
      // Randomly assign sizes for demo purposes
      const wallsWithSize = data.map(w => ({ ...w, size: ['mobile', 'tablet', 'pc'][Math.floor(Math.random() * 3)] }));
      setWalls(wallsWithSize);
      setLoading(false);
    };

    loadSearchImages();
  }, [currentQuery]);

  // Filter logic
  const filtered = size === 'all' ? walls : walls.filter(w => w.size === size);

  // Handle searching *within* the search page
  const handleLocalSearch = (newQuery) => {
      setCurrentQuery(newQuery);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <FloatingParticles darkMode={darkMode} />
        <Sparkles className="w-16 h-16 animate-spin text-blue-500 relative z-10" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <FloatingParticles darkMode={darkMode} />
      <div className="relative z-10">
        <Header 
          username={username} 
          onLogout={onLogout} 
          showBack 
          onBack={onBack} 
          categoryName={`Results: "${currentQuery}"`} 
          categoryIcon={<Search className="w-6 h-6 text-white" />} 
          categoryColor="from-purple-500 to-pink-500" 
          darkMode={darkMode} 
          onToggleDarkMode={onToggleDarkMode} 
          onGoToFavorites={onGoToFavorites}
        />
        <main className="container mx-auto px-4 py-8">
          {/* Search bar allows searching again here */}
          <SearchBar darkMode={darkMode} onSearch={handleLocalSearch} />
          
          {/* Filter Section */}
          <div className={`mb-8 rounded-2xl p-6 border shadow-xl ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Filter className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filters</h2>
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Device Size</label>
              <div className="flex gap-2 flex-wrap">
                {['all', 'mobile', 'tablet', 'pc'].map(s => (
                  <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${size === s ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <p className={`text-sm flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4" />
              Found {filtered.length} wallpapers
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(w => (
              <WallpaperCard key={w.id} wallpaper={w} showSize darkMode={darkMode} onImageClick={onImageClick} favorites={favorites}
   onToggleFavorite={onToggleFavorite}/>
            ))}
             {filtered.length === 0 && !loading && (
                 <div className={`col-span-full text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                     <p className="text-2xl font-bold mb-2">No results found 😢</p>
                     <p>Try searching for something else.</p>
                 </div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;