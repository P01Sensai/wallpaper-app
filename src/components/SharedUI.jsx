import React, { useState, useEffect } from 'react';
import { Search, Image, Eye, Download, Star, CheckCircle, Info } from 'lucide-react';

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

//  NEW ANIMATED STATS BAR 
export const StatsBar = ({ darkMode }) => {
  // Configuration for the stats
  const stats = [
    { icon: <Image className="w-5 h-5" />, value: 10000, suffix: '+', label: 'Wallpapers', color: 'from-blue-400 to-cyan-400' },
    { icon: <Eye className="w-5 h-5" />, value: 1500, suffix: 'K+', label: 'Total Views', color: 'from-purple-400 to-pink-400' },
    { icon: <Download className="w-5 h-5" />, value: 500, suffix: 'K+', label: 'Downloads', color: 'from-green-400 to-emerald-400' },
    { icon: <Star className="w-5 h-5" />, value: 4.9, suffix: '', label: 'Avg Rating', color: 'from-yellow-400 to-orange-400', isDecimal: true }
  ];

  // Helper component to animate numbers
  const AnimatedNumber = ({ target, isDecimal }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime;
      const duration = 2000; // 2 seconds animation
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(progress * target);
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animate);
    }, [target]);

    return isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString();
  };

  return (
    <div className={`
      relative overflow-hidden mb-12 rounded-3xl p-1
      bg-gradient-to-r ${darkMode ? 'from-gray-800 to-gray-900' : 'from-white to-gray-50'}
      shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-white'}
    `}>
      {/* Decorative background glow */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50`}></div>

      <div className={`
        grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8
        backdrop-blur-xl ${darkMode ? 'bg-gray-900/40' : 'bg-white/40'}
      `}>
        {stats.map((stat, i) => (
          <div key={i} className="group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 hover:scale-105 cursor-default">
            
            {/* Animated Icon Circle */}
            <div className={`
              mb-3 p-3 rounded-2xl shadow-lg transition-transform duration-300 group-hover:rotate-12
              bg-gradient-to-br ${stat.color} text-white
            `}>
              {stat.icon}
            </div>

            {/* Animated Number with Gradient Text */}
            <div className={`text-3xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
              <AnimatedNumber target={stat.value} isDecimal={stat.isDecimal} />
              {stat.suffix}
            </div>

            {/* Label */}
            <p className={`text-sm font-medium tracking-wide uppercase ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-500 group-hover:text-gray-700'}`}>
              {stat.label}
            </p>
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

export const ToastNotification = ({ message, show, type = 'success' }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl ${type === 'success' ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}>
        {type === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Info className="w-5 h-5 text-white" />}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

// SPLASH SCREEN COMPONENT
export const SplashScreen = ({ finishLoading }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Wait 2.5 seconds, then start fading out
    const timeout = setTimeout(() => {
        setVisible(false);
        // Wait another 0.5s for fade animation to finish, then tell App.jsx we are done
        setTimeout(finishLoading, 500); 
    }, 2500);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-gray-900 to-gray-900"></div>

        {/* Logo Animation */}
        <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6">
                {/* Glowing Ring */}
                <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-3xl shadow-2xl animate-bounce">
                    <Image className="w-12 h-12 text-white" />
                </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2 animate-pulse">
                WallpaperHub
            </h1>
            <p className="text-blue-400 text-sm tracking-widest uppercase font-semibold">
                Curating Masterpieces
            </p>
        </div>

        {/* Loading Spinner at Bottom */}
        <div className="absolute bottom-12">
            <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    </div>
  );
};