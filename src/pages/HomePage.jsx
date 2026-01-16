import React, { useState, useEffect } from 'react';
import { TrendingUp, Star, Sparkles, Heart } from 'lucide-react';
import { unsplashApi } from '../services/unsplashApi';
import { CATEGORIES } from '../config/constants';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import WallpaperCard from '../components/WallpaperCard';
import { FloatingParticles, StatsBar, SearchBar } from '../components/SharedUI';

//Internal Components 

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

// Footer Component with About Me and Dummy Links
const Footer = ({ darkMode }) => {

    const linkGroups = [
        { title: "Product", links: ["Overview", "Features", "Solutions", "Tutorials", "Pricing", "Releases"] },
        { title: "Company", links: ["About Pramanshu", "Careers", "Press", "News", "Media Kit", "Contact"] },
        { title: "Resources", links: ["Blog", "Newsletter", "Events", "Help Centre", "Tutorials", "Support"] },
        { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Licenses", "Settings", "Contact"] },
    ];

    const textColor = darkMode ? 'text-gray-400' : 'text-gray-600';
    const headingColor = darkMode ? 'text-white' : 'text-gray-900';

    return (
        <footer className={`mt-24 pt-16 pb-8 ${darkMode ? 'bg-gray-800/80 border-t border-gray-700' : 'bg-white/80 border-t border-gray-200'} backdrop-blur-lg relative z-10 rounded-t-3xl`}>
            <div className="container mx-auto px-4">
                
                {/* Top Section: About Me & Newsletter dummy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* About Me */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                             <Sparkles className="w-6 h-6 text-blue-500" />
                             <h3 className={`text-2xl font-bold ${headingColor}`}>About Pramanshu</h3>
                        </div>
                        <p className={`${textColor} leading-relaxed mb-6 max-w-md`}>
                            Welcome to my digital gallery! I'm Pramanshu, a developer passionate about curating stunning visuals. This platform is built with React and powered by Unsplash to bring you high-quality wallpapers for every mood and device.
                        </p>

                         <div className="flex gap-4">
                             {['twitter', 'github', 'linkedin'].map(social => (
                                 <a key={social} href="#" onClick={e => e.preventDefault()} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}>
                                     <span className="capitalize text-sm">{social}</span>
                                 </a>
                             ))}
                         </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                         <h4 className={`text-lg font-semibold mb-2 ${headingColor}`}>Stay in the loop</h4>
                         <p className={`text-sm ${textColor} mb-4`}>Subscribe to get the latest wallpapers delivered to your inbox.</p>
                         <div className="flex gap-2">
                             <input type="email" placeholder="Enter your email" className={`flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800'}`} disabled />
                             <button className="bg-blue-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors">Subscribe</button>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
                    {linkGroups.map((group, idx) => (
                        <div key={idx}>
                            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${headingColor}`}>{group.title}</h4>
                            <ul className="space-y-3">
                                {group.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        {/* Dummy link with preventDefault */}
                                        <a href="#" onClick={(e) => e.preventDefault()} className={`${textColor} hover:${headingColor} transition-colors text-[15px] font-medium`}>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={`pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${textColor}`}>
                    <p>© {new Date().getFullYear()} Pramanshu. All rights reserved.</p>
                     <p className="flex items-center gap-1">
                         Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React & Tailwind
                     </p>
                </div>
            </div>
        </footer>
    );
};


// Main HomePage Component

const HomePage = ({ username, onLogout, onCategoryClick, darkMode, onToggleDarkMode, onMainSearch, onImageClick }) => {
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
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header username={username} onLogout={onLogout} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />

        <main className="container mx-auto px-4 py-8 flex-grow">
          <StatsBar darkMode={darkMode} />
          <SearchBar darkMode={darkMode} onSearch={onMainSearch} />
          
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
                {popular.map(w => <WallpaperCard key={w.id} wallpaper={w} showSize darkMode={darkMode} onImageClick={onImageClick} />)}
              </div>
            </div>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};

export default HomePage;