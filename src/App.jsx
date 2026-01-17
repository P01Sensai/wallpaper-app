import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage'; 
import ImageModal from './components/ImageModal';

export default function WallpaperWebsite() {
  const [page, setPage] = useState('login');
  const [cat, setCat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState('');
  const [dark, setDark] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 1. FAVORITES LOGIC (The Brain)
  // Load from LocalStorage when app starts
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Function to add/remove
  const toggleFavorite = (wallpaper) => {
    setFavorites(prev => {
      const isFav = prev.find(w => w.id === wallpaper.id);
      if (isFav) {
        return prev.filter(w => w.id !== wallpaper.id); // Remove
      } else {
        return [...prev, wallpaper]; // Add
      }
    });
  };

  const handleAppSearch = (query) => {
    setSearchQuery(query);
    setPage('search');
  };

  const handleLogout = () => {
    setUser('');
    setPage('login');
  }

  const handleBackToHome = () => {
      setPage('home');
      setCat(null);
      setSearchQuery('');
  }

  // 2. Pass these new powers to every page
  const commonProps = {
      username: user,
      onLogout: handleLogout,
      darkMode: dark,
      onToggleDarkMode: () => setDark(!dark),
      onImageClick: (img) => setSelectedImage(img),
      // Pass the favorites data down
      favorites: favorites,
      onToggleFavorite: toggleFavorite,
      onGoToFavorites: () => setPage('favorites') // New Navigation helper
  };

  return (
    <>
      {/* Modal now knows if image is liked */}
      <ImageModal 
        wallpaper={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        darkMode={dark}
        isFavorite={favorites.some(f => f.id === selectedImage?.id)}
        onToggleFavorite={() => selectedImage && toggleFavorite(selectedImage)}
      />

      {page === 'login' ? (
        <LoginPage onLogin={u => { setUser(u); setPage('home'); }} />
      ) : page === 'category' && cat ? (
        <CategoryPage category={cat} onBack={handleBackToHome} {...commonProps} />
      ) : page === 'search' && searchQuery ? (
        <SearchPage initialQuery={searchQuery} onBack={handleBackToHome} {...commonProps} />
      ) : page === 'favorites' ? (  
        // 3. New Route for Favorites Page
        <FavoritesPage onBack={handleBackToHome} {...commonProps} />
      ) : (
        <HomePage 
          onCategoryClick={c => { setCat(c); setPage('category'); }} 
          onMainSearch={handleAppSearch}
          {...commonProps} 
        />
      )}
    </>
  );
}