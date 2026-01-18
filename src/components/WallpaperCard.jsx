import React, { useState } from 'react';
import { Heart, Sparkles, Zap, Download, Maximize2 } from 'lucide-react';

const WallpaperCard = ({ wallpaper, showSize, darkMode, onImageClick, favorites = [], onToggleFavorite, showToast }) => {
  const [loaded, setLoaded] = useState(false);

  // CHECK: Is this specific wallpaper already in the list?
  // I use .some() to check if any item in the favorites array matches this ID
  const isLiked = favorites.some(f => f.id === wallpaper.id);

  return (
    <div className={`group relative rounded-xl overflow-hidden border hover:shadow-2xl hover:-translate-y-2 transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      
      {/* Loading Spinner */}
      {!loaded && (
        <div className={`w-full h-64 flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <Sparkles className={`w-8 h-8 animate-spin ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        </div>
      )}

      {/* Main Image */}
      <div 
        className="cursor-zoom-in relative"
        onClick={() => onImageClick && onImageClick(wallpaper)}
      >
        <img 
          src={wallpaper.urls?.regular || wallpaper.url} 
          alt={wallpaper.alt_description || 'Wallpaper'} 
          className={`w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110 ${loaded ? 'block' : 'hidden'}`} 
          onLoad={() => setLoaded(true)} 
        />
        
        {/* Hover Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            <div className="bg-black/30 backdrop-blur-sm p-2 rounded-full">
                <Maximize2 className="w-6 h-6 text-white" />
            </div>
        </div>
      </div>

      {/* LIKE BUTTON */}
      {/* Now calls the main App function to save/remove data */}
      <button 
        onClick={(e) => { 
            e.stopPropagation(); // Stop the click from opening the modal
            if (onToggleFavorite) onToggleFavorite(wallpaper); 
        }} 
        className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'}`}
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
      </button>

      {/* Size Tag */}
      {showSize && wallpaper.size && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg z-10">
          {wallpaper.size}
        </div>
      )}

      {/* Bottom info bar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute bottom-0 p-4 w-full pointer-events-auto">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3 text-yellow-400" />
            <p className="text-white text-sm font-medium line-clamp-1">{wallpaper.alt_description || 'Beautiful Wallpaper'}</p>
          </div>
          {wallpaper.user && (
            <p className="text-blue-200 text-xs mb-3">by {wallpaper.user.name}</p>
          )}
          
          <a 
            href={wallpaper.links?.download || wallpaper.urls?.full} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => {e.stopPropagation(); 
              if(showToast) showToast("Download Started... 🚀", "success");}} // notification trigger
            className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-center hover:from-blue-600 hover:to-cyan-600 transition-all"
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download HD
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;