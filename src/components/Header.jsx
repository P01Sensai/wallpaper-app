import React, { useEffect, useState } from 'react';
import { Sun, Moon, Home, Image, LogOut, Menu, X, User, Heart } from 'lucide-react';

const Header = ({ username, onLogout, showBack, onBack, categoryName, categoryIcon, categoryColor, darkMode, onToggleDarkMode, onGoToFavorites }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // this is threshold if it is scrolled more than 50px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = isScrolled
    ? (darkMode ? 'bg-gray-900/95 border-b border-gray-700 shadow-md' : 'bg-white/95 border-b border-gray-200 shadow-md')
    : 'bg-transparent border-b border-transparent';
  
  const textColor = (!isScrolled && !showBack) ? 'text-white drop-shadow-md' : (darkMode ? 'text-white' : 'text-gray-900');
  const iconColor = (!isScrolled && !showBack) ? 'text-white/80 hover:text-white drop-shadow-md' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900');

  return (
   <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerStyle} backdrop-blur-sm`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* LEFT SIDE: Logo & Title (Cleaned up) */}
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={onBack}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${darkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700'}`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Back</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${categoryColor || 'from-blue-600 to-cyan-500'}`}>
                  {categoryIcon || <Image className="w-6 h-6 text-white" />}
                </div>
                <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {categoryName || 'WallpaperHub'}
                </h1>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Controls & Menu */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* 1. Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* 2. Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${darkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-200' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span className="hidden sm:inline font-medium">Menu</span>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <>
                  {/* Invisible backdrop to close menu when clicking outside */}
                  <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />

                  <div className={`absolute right-0 top-12 w-56 rounded-xl shadow-2xl border p-2 z-20 transform origin-top-right transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>

                    {/* User Info Section */}
                    {username && (
                      <div className={`px-4 py-3 mb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Signed in as</p>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-500" />
                          <p className={`font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{username}</p>
                        </div>
                      </div>
                    )}

                    {/* Menu Items */}
                    <div className="space-y-1">
                      {showBack && (
                        <button
                          onClick={() => { onBack(); setIsMenuOpen(false); }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          <Home className="w-4 h-4" /> Home
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (onGoToFavorites) onGoToFavorites(); // Call parent function
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        <Heart className="w-4 h-4 text-red-500" /> My Favorites
                      </button>
                      <button
                        onClick={() => { onLogout(); setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;