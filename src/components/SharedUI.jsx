import React, { useState } from 'react';
import { Search, Image, Eye, Download, Star } from 'lucide-react';

export const FloatingParticles = ({ darkMode }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className={`absolute rounded-full ${darkMode ? 'bg-blue-400/10' : 'bg-blue-500/5'}`}
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
    <style>{`@keyframes float { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(30px, -30px) rotate(120deg); } 66% { transform: translate(-20px, 20px) rotate(240deg); }}`}</style>
  </div>
);

export const StatsBar = ({ darkMode }) => {
  const stats = [
    { icon: <Image className="w-4 h-4" />, label: '10K+', text: 'Wallpapers' },
    { icon: <Eye className="w-4 h-4" />, label: '1M+', text: 'Views' },
    { icon: <Download className="w-4 h-4" />, label: '500K+', text: 'Downloads' },
    { icon: <Star className="w-4 h-4" />, label: '4.9', text: 'Rating' }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md rounded-2xl p-4 sm:p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-xl mb-8`}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center group">
            <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.label}</p>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SearchBar = ({ darkMode, onSearch }) => {
  const [query, setQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md rounded-2xl p-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-xl mb-8`}>
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          placeholder="Search wallpapers... (Nature, City, Abstract)"
          className={`w-full pl-12 pr-24 py-3 sm:py-4 rounded-xl ${darkMode ? 'bg-gray-900/50 text-white placeholder-gray-500' : 'bg-white text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600">
          Search
        </button>
      </div>
    </div>
  );
};