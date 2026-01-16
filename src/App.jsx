import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ImageModal from './components/ImageModal';

export default function WallpaperWebsite() {
  const [page, setPage] = useState('login');
  const [cat, setCat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState('');
  const [dark, setDark] = useState(false);
  
  // State for the currently zoomed image
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Common props for all pages to make them cleaner
  const commonProps = {
      username: user,
      onLogout: handleLogout,
      darkMode: dark,
      onToggleDarkMode: () => setDark(!dark),
      // Pass the "Open Modal" function to every page
      onImageClick: (img) => setSelectedImage(img) 
  };

  return (
    <>
      {/*The Modal sits on top of everything else */}
      <ImageModal 
        wallpaper={selectedImage} 
        onClose={() => setSelectedImage(null)} 
        darkMode={dark} 
      />

      {/* Page Routing */}
      {page === 'login' ? (
        <LoginPage onLogin={u => { setUser(u); setPage('home'); }} />
      ) : page === 'category' && cat ? (
        <CategoryPage 
          category={cat} 
          onBack={handleBackToHome} 
          {...commonProps} 
        />
      ) : page === 'search' && searchQuery ? (
        <SearchPage
          initialQuery={searchQuery}
          onBack={handleBackToHome}
          {...commonProps}
        />
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