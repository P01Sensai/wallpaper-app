import React from 'react';
import { Heart, Download, Maximize2 } from 'lucide-react';

const WallpaperCard = ({ wallpaper, showSize, darkMode, onImageClick, favorites = [], onToggleFavorite, showToast, isGuest }) => {
  
  const isFavorite = favorites.some(f => f.id === wallpaper.id);

  // Use Blob method for direct download 
  const handleDownload = async (e) => {
    e.stopPropagation(); 
    
    if (isGuest) {
        if (showToast) showToast("Sign in to download! 🔒", "error");
        return;
    }

    try {
        if (showToast) showToast("Starting download...", "info");
        
        // Fetch the image as a "Blob" 
        const response = await fetch(wallpaper.urls.full);
        const blob = await response.blob();
        
        // Create a temporary link to that File
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `wallpaper-${wallpaper.id}.jpg`;
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        if (showToast) showToast("Download started! 🚀", "success");
    } catch (error) {
        console.error("Download failed:", error);
        if (showToast) showToast("Download failed", "error");
    }
  };

  return (
    <div 
      className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
      onClick={() => onImageClick(wallpaper)}
    >
    
      <div className="h-80 w-full relative">
        <img 
          src={wallpaper.urls.small} 
          alt={wallpaper.alt_description} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay  */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

        {/* Top Right Actions */}
        
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          
          {/* Favorite Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(wallpaper); }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              isFavorite 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-black/50 text-white hover:bg-black/70' // Dark background for visibility
            }`}
            title="Favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          {/* Download Button */}
          <button 
            onClick={handleDownload}
            className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-all"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Size Badge */}
        {showSize && wallpaper.size && (
           <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-medium text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
             {wallpaper.size}
           </div>
        )}

        {/* User Info  */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <p className="text-white text-sm font-medium truncate">{wallpaper.user.name}</p>
           <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
              <Maximize2 className="w-3 h-3" />
              <span>Tap to view</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;