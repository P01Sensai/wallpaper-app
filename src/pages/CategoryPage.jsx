import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, Clock } from 'lucide-react';
import { unsplashApi } from '../services/unsplashApi';
import Header from '../components/Header';
import WallpaperCard from '../components/WallpaperCard';
import { FloatingParticles, SearchBar } from '../components/SharedUI';

const CategoryPage = ({ category, username, onLogout, onBack, darkMode, onToggleDarkMode }) => {
  const [size, setSize] = useState('all');
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryImages = async () => {
      setLoading(true);
      const data = await unsplashApi.searchPhotos(category.query, 1, 24);
      // Randomly assign sizes for demo purposes
      const wallsWithSize = data.map(w => ({ ...w, size: ['mobile', 'tablet', 'pc'][Math.floor(Math.random() * 3)] }));
      setWalls(wallsWithSize);
      setLoading(false);
    };
    loadCategoryImages();
  }, [category]);

  const filtered = size === 'all' ? walls : walls.filter(w => w.size === size);

  const handleSearch = async (query) => {
    const results = await unsplashApi.searchPhotos(query, 1, 24);
    const wallsWithSize = results.map(w => ({ ...w, size: ['mobile', 'tablet', 'pc'][Math.floor(Math.random() * 3)] }));
    setWalls(wallsWithSize);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Sparkles className="w-16 h-16 animate-spin text-blue-500" />
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
          categoryName={`${category.name} Wallpapers`} 
          categoryIcon={category.icon} 
          categoryColor={category.color} 
          darkMode={darkMode} 
          onToggleDarkMode={onToggleDarkMode} 
        />
        <main className="container mx-auto px-4 py-8">
          <SearchBar darkMode={darkMode} onSearch={handleSearch} />
          
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
              Showing {filtered.length} wallpapers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(w => (
              <WallpaperCard key={w.id} wallpaper={w} showSize darkMode={darkMode} onImageClick={onImageClick} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;