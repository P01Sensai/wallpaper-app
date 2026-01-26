import React from 'react';
import { X, Download, User, MapPin, Calendar, Heart } from 'lucide-react';

const ImageModal = ({ wallpaper, onClose, darkMode }) => {
  if (!wallpaper) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} 
        onClick={e => e.stopPropagation()} // Stop click from closing modal
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section - Takes up most space */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <img 
            src={wallpaper.urls?.regular || wallpaper.url} 
            alt={wallpaper.alt_description} 
            className="max-w-full max-h-[50vh] md:max-h-[90vh] object-contain"
          />
        </div>

        {/* Details Sidebar */}
        <div className="w-full md:w-80 p-6 flex flex-col h-auto md:h-full overflow-y-auto">
          
          {/* User Info */}
          <div className="flex items-center gap-3 mb-6">
             <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                {/* Fallback avatar if Unsplash user image is missing */}
                {wallpaper.user?.profile_image?.medium ? (
                   <img src={wallpaper.user.profile_image.medium} alt="User" />
                ) : (
                   <User className="w-full h-full p-2 text-gray-500" />
                )}
             </div>
             <div>
                <h3 className="font-bold text-lg leading-tight">{wallpaper.user?.name || 'Unknown Artist'}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@{wallpaper.user?.username || 'user'}</p>
             </div>
          </div>

          <div className={`space-y-4 mb-8 flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
             {wallpaper.description && (
               <p className="italic text-sm">"{wallpaper.description}"</p>
             )}
             
             <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Published on {new Date(wallpaper.created_at || Date.now()).toLocaleDateString()}</span>
             </div>
             
             {wallpaper.location?.name && (
                <div className="flex items-center gap-2 text-sm">
                   <MapPin className="w-4 h-4" />
                   <span>{wallpaper.location.name}</span>
                </div>
             )}
             
             <div className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{wallpaper.likes || 0} Likes</span>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-3">
            <a 
              href={wallpaper.links?.download} 
              download 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
            >
              <Download className="w-5 h-5" />
              Download Free
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageModal;