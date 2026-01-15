import React, { useState, useEffect } from 'react';
import { TrendingUp, Star, Sparkles } from 'lucide-react';
import { unsplashApi } from '../services/unsplashApi';
import { CATEGORIES } from '../config/constants';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import WallpaperCard from '../components/WallpaperCard';
import { FloatingParticles, StatsBar, SearchBar } from '../components/SharedUI';

const CategoryGrid = ({ categories, onCategoryClick }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    {categories.map(c => (
      <button key={c.name} onClick={() => onCategoryClick(c)} className={`bg-gradient-to-br ${c.color} p-6 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{c.icon}</div>
        <p className="text-white font-bold">{c.name}</p>
      </button>
    ))}
  </div>
);

const HomePage = ({ username, onLogout, onCategoryClick, darkMode, onToggleDarkMode }) => {
  const [slide, setSlide] = useState(0);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const trendingData = await unsplashApi.getRandomPhotos(5, 'wallpaper,landscape');
      const popularData = await unsplashApi.getRandomPhotos(12, 'nature,city,abstract');
      setTrending(trendingData);
      setPopular(popularData);
      setLoading(false);
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (trending.length > 0) {
      const int = setInterval(() => setSlide(s => (s + 1) % trending.length), 4000);
      return () => clearInterval(int);
    }
  }, [trending]);

  const handleSearch = async (query) => {
    const results = await unsplashApi.searchPhotos(query, 1, 12);
    setPopular(results);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Sparkles className="w-16 h-16 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <FloatingParticles darkMode={darkMode} />
      <div className="relative z-10">
        <Header username={username} onLogout={onLogout} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
        <main className="container mx-auto px-4 py-8">
          <StatsBar darkMode={darkMode} />
          <SearchBar darkMode={darkMode} onSearch={handleSearch} />
          {trending.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Trending Wallpapers</h2>
              </div>
              <Carousel slides={trending} currentSlide={slide} onNext={() => setSlide(s => (s + 1) % trending.length)} onPrev={() => setSlide(s => (s - 1 + trending.length) % trending.length)} onDotClick={setSlide} />
            </div>
          )}
          <div className="mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Categories</h2>
            <CategoryGrid categories={CATEGORIES} onCategoryClick={onCategoryClick} />
          </div>
          {popular.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Popular Wallpapers</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {popular.map(w => <WallpaperCard key={w.id} wallpaper={w} showSize darkMode={darkMode} />)}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;