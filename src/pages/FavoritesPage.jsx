import React from 'react';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import WallpaperCard from '../components/WallpaperCard';
import { FloatingParticles } from '../components/SharedUI';


const FavoritesPage = ({ username, onLogout, onBack, darkMode, onToggleDarkMode, onImageClick, favorites = [], onToggleFavorite, onGoToFavorites, showToast }) => {
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <FloatingParticles darkMode={darkMode} />
      <div className="relative z-10">
        
        {/* Header now receives the correct navigation props */}
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
          onGoToFavorites={onGoToFavorites}
        />
        
        <main className="container mx-auto px-4 pt-24 pb-8">
          {/* Stats Box */}
          <div className={`mb-8 p-6 rounded-2xl border ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} shadow-lg backdrop-blur-md`}>
             <div className="flex items-center gap-3">
                 <div className="p-3 bg-red-100 rounded-full text-red-500">
                     <Heart className="w-6 h-6 fill-current" />
                 </div>
                 <div>
                     <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your Collection</h2>
                     <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        You have saved <strong>{favorites.length}</strong> wallpapers.
                     </p>
                 </div>
             </div>
          </div>

          {/* Empty State */}
          {favorites.length === 0 ? (
             <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6 shadow-inner">
                   <Heart className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No favorites yet</h3>
                <p className={`mb-8 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Start exploring and click the <Heart className="w-4 h-4 inline text-red-500" /> to save what you love!
                </p>
                <button 
                    onClick={onBack} 
                    className="group flex items-center gap-2 mx-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                   <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                   Go Explore
                </button>
             </div>
          ) : (
             /* Grid of Favorites */
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map(w => (
                  <WallpaperCard 
                    key={w.id} 
                    wallpaper={w} 
                    showSize 
                    darkMode={darkMode} 
                    onImageClick={onImageClick}
                    favorites={favorites} 
                    onToggleFavorite={onToggleFavorite}
                    
                    // Passing showToast 
                    showToast={showToast}
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