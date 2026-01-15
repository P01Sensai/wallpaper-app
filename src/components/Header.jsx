import React from 'react';
import { Sun, Moon, Home, Image, LogOut } from 'lucide-react';

const Header = ({ username, onLogout, showBack, onBack, categoryName, categoryIcon, categoryColor, darkMode, onToggleDarkMode }) => (
  <header className={`${darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-md border-b sticky top-0 z-50 shadow-sm`}>
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <button onClick={onToggleDarkMode} className={`p-3 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {showBack && <button onClick={onBack} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}><Home className="w-4 h-4" />Home</button>}
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${categoryColor || 'from-blue-500 to-cyan-500'} p-2 rounded-lg`}>
              {categoryIcon || <Image className="w-6 h-6 text-white" />}
            </div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{categoryName || 'WallpaperHub'}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {username && <span className={`text-sm hidden md:inline ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hello, {username}!</span>}
          <button onClick={onLogout} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}><LogOut className="w-4 h-4" />Logout</button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;