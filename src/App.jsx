import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage'; 
import ImageModal from './components/ImageModal';
import { ToastNotification, SplashScreen } from './components/SharedUI';

export default function WallpaperWebsite() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('login');
  const [cat, setCat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState('');
  const [dark, setDark] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success'});

  const showToast = (message, type = 'success') => {
    setToast({show:true, message, type});
    setTimeout(() => setToast(prev => ({...prev, show: false})), 3000);
  }

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // RESTRICT FAVORITES 
  const toggleFavorite = (wallpaper) => {
    // If Guest, block action and show error
    if (user === 'guest') {
        showToast("Sign in to save favorites! 🔒", "error");
        return; 
    }

    setFavorites(prev => {
      const isFav = prev.find(w => w.id === wallpaper.id);
      if (isFav) {
        showToast("Removed from Favorites", "info"); 
        return prev.filter(w => w.id !== wallpaper.id); 
      } else {
        showToast("Added to Favorites ❤️", "success"); 
        return [...prev, wallpaper]; 
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

  // RESTRICT NAVIGATION 
  const handleGoToFavorites = () => {
      if (user === 'guest') {
          showToast("Sign in to view favorites! 🔒", "error");
          return;
      }
      setPage('favorites');
  }

  
  const commonProps = {
      username: user === 'guest' ? 'Guest_User' : user,
      onLogout: handleLogout,
      darkMode: dark,
      onToggleDarkMode: () => setDark(!dark),
      onImageClick: (img) => setSelectedImage(img),
      favorites: favorites,
      onToggleFavorite: toggleFavorite,
      onGoToFavorites: handleGoToFavorites,
      showToast: showToast,
      isGuest: user === 'guest' 
  };

  return (
    <>
      {isLoading && <SplashScreen finishLoading={() => setIsLoading(false)} />}
      
      <ToastNotification show={toast.show} message={toast.message} type={toast.type} />
      
      <ImageModal 
        wallpaper={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        darkMode={dark}
        isFavorite={favorites.some(f => f.id === selectedImage?.id)}
        onToggleFavorite={() => selectedImage && toggleFavorite(selectedImage)}
        showToast={showToast}
        isGuest={user === 'guest'} // Pass to Modal to block download there too
      />

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {page === 'login' ? (
            <LoginPage onLogin={u => { setUser(u); setPage('home'); }} />
        ) : page === 'category' && cat ? (
            <CategoryPage category={cat} onBack={handleBackToHome} {...commonProps} />
        ) : page === 'search' && searchQuery ? (
            <SearchPage initialQuery={searchQuery} onBack={handleBackToHome} {...commonProps} />
        ) : page === 'favorites' ? (  
            <FavoritesPage onBack={handleBackToHome} {...commonProps} />
        ) : (
            <HomePage 
            onCategoryClick={c => { setCat(c); setPage('category'); }} 
            onMainSearch={handleAppSearch}
            {...commonProps} 
            />
        )}
      </div>
    </>
  );
}