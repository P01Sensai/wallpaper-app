import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import WallpaperCard from '../components/WallpaperCard';
import { FloatingParticles } from '../components/SharedUI';

const FavoritesPage = ({ username, onLogout, onBack, darkMode, onToggleDarkMode, onImageClick, favorites, onToggleFavorite }) => {
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <FloatingParticles darkMode={darkMode} />
      <div className="relative z-10">
        <Header 
          username={username} 
          onLogout={onLogout} 
          showBack 
          onBack={onBack} 
          categoryName="My Favorites" 
          categoryIcon={<Heart className="w-6 h-6 text-white" />} 
          categoryColor="from-red-500 to-pink-600" 
          darkMode={darkMode} 
          onToggleDarkMode={onToggleDarkMode} 
        />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header Stats */}
          <div className={`mb-8 p-6 rounded-2xl border ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} shadow-lg`}>
             <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your Collection</h2>
             <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You have saved <strong>{favorites.length}</strong> wallpapers.
             </p>
          </div>

          {/* Empty State */}
          {favorites.length === 0 ? (
             <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                   <Heart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No favorites yet</h3>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start exploring and heart the ones you love!</p>
                <button onClick={onBack} className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600">
                   Go Explore
                </button>
             </div>
          ) : (
             /* Grid of Favorites */
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favorites.map(w => (
                  <WallpaperCard 
                    key={w.id} 
                    wallpaper={w} 
                    showSize 
                    darkMode={darkMode} 
                    onImageClick={onImageClick}
                    favorites={favorites} 
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FavoritesPage;