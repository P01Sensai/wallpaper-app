import React, { useState} from 'react'; 
import { X, Download, Heart, MapPin, Calendar, Edit2 } from 'lucide-react';
import ImageEditor from './ImageEditor';

export default function ImageModal({ wallpaper, onClose, darkMode, isFavorite, onToggleFavorite, showToast, isGuest }) {
  const [isEditing, setIsEditing] = useState(false);


  if (!wallpaper) return null;

  const handleDownload = async () => {
    // Guest Check
    if (isGuest) {
        showToast("Sign in to download! 🔒", "error");
        return;
    }

    try {
      showToast("Starting download...", "info");
      const response = await fetch(wallpaper.urls.full);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wallpaper-${wallpaper.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showToast("Download started! 🚀", "success");
    } catch (error) {
      console.error(error);
      showToast("Download failed", "error");
    }
  };

  const profileImage = wallpaper.user.profile_image?.medium || 'https://via.placeholder.com/150';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className={`relative w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {isEditing ? (
            <ImageEditor
                imageSrc={wallpaper.urls.full}
                onCancel={() => setIsEditing(false)}
                onSave={() => {
                    setIsEditing(false);
                    showToast("Edited wallpaper saved! 🎨", "success");
                }}
            />
        ) : (
            <>
                {/* LEFT SIDE for the Image */}
                <div className="w-full md:w-3/5 h-1/2 md:h-full bg-black relative group">
                    <img
                        src={wallpaper.urls.regular}
                        alt={wallpaper.alt_description}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* RIGHT SIDE for the Details */}
                <div className={`w-full md:w-2/5 h-1/2 md:h-full p-6 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>

                    {/* USER HEADER */}
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={profileImage}
                            alt={wallpaper.user.name}
                            className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-gray-700"
                        />
                        <div>
                            <h3 className="text-xl font-bold leading-tight">
                                {wallpaper.user.name}
                            </h3>
                            {wallpaper.user.username && (
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    @{wallpaper.user.username}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* METADATA LIST */}
                    <div className="space-y-3 mb-8 pl-1">
                        <div className="flex items-center gap-3">
                            <Calendar className="text-gray-400" size={18} />
                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Published on {new Date(wallpaper.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        {wallpaper.location?.name && (
                            <div className="flex items-start gap-3">
                                <MapPin className="text-gray-400 shrink-0 mt-0.5" size={18} />
                                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {wallpaper.location.name}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <Heart className="text-red-500 fill-current" size={18} />
                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {wallpaper.likes} Likes
                            </span>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-auto space-y-3">
                        <button
                            onClick={handleDownload}
                            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
                        >
                            <Download size={20} />
                            Download Original
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => {
                                    if(isGuest) {
                                        showToast("Sign in to edit! 🔒", "error");
                                        return;
                                    }
                                    setIsEditing(true);
                                }}
                                className={`py-3 rounded-xl font-semibold border transition-all flex items-center justify-center gap-2 ${darkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Edit2 size={18} />
                                Customize
                            </button>

                            <button
                                onClick={onToggleFavorite}
                                className={`py-3 rounded-xl font-semibold border transition-all flex items-center justify-center gap-2 ${isFavorite ? 'bg-red-500 border-red-500 text-white' : (darkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-200 hover:bg-gray-50')}`}
                            >
                                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                                {isFavorite ? 'Saved' : 'Save'}
                            </button>
                        </div>
                    </div>

                </div>
            </>
        )}
      </div>
    </div>
  );
}