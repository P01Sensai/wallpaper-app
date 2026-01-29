import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage'; 
import ImageModal from './components/ImageModal';
import { ToastNotification, SplashScreen } from './components/SharedUI';

export default function WallpaperWebsite() {
  const [isLoading, setIsLoading] = useState(true);
  
  // State
  const [page, setPage] = useState('login');
  const [cat, setCat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); 
  
  const [dark, setDark] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success'});

  // FAVORITES STATE (Initialize Empty)
  const [favorites, setFavorites] = useState([]);

  // FIREBASE AUTH & DATA LOADING 
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
  
        //  LOAD FAVORITES DIRECTLY HERE
        if (!currentUser.isAnonymous) {
            const userKey = `favorites_${currentUser.uid}`;
            const saved = localStorage.getItem(userKey);
            setFavorites(saved ? JSON.parse(saved) : []);
        } else {
            setFavorites([]); // Guest starts empty
        }

        // Handle Redirect
        if (page === 'login') {
            setPage('home');
            window.history.replaceState({ page: 'home' }, '', '');
        }
      } else {
        // User logged out
        setUser(null);
        setFavorites([]); // Clear data
        setPage('login');
        window.history.replaceState({ page: 'login' }, '', '');
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [page]); // Keep page dependency for redirect logic

  // HISTORY MANAGER
  useEffect(() => {
    if (!window.history.state) {
        window.history.replaceState({ page: 'login' }, '', '');
    }

    const handleBackButton = (event) => {
      if (event.state) {
        setPage(event.state.page || 'login');
        if (event.state.cat) setCat(event.state.cat);
        if (event.state.searchQuery) setSearchQuery(event.state.searchQuery);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, []);

  const navigateTo = (newPage, extraState = {}) => {
    setPage(newPage);
    window.history.pushState({ page: newPage, ...extraState }, '', '');
  };

  // SAVE FAVORITES ONLY 
  
  useEffect(() => {
    if (user && !user.isAnonymous && user.uid) {
      const userKey = `favorites_${user.uid}`;
      localStorage.setItem(userKey, JSON.stringify(favorites));
    }
  }, [favorites, user?.uid]); 

  // TOAST FUNCTION
  const showToast = (message, type = 'success') => {
    setToast({show:true, message, type});
    setTimeout(() => setToast(prev => ({...prev, show: false})), 3000);
  }

  const toggleFavorite = (wallpaper) => {
    if (!user || user.isAnonymous) {
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

  const handleCategoryClick = (category) => {
      setCat(category);
      navigateTo('category', { cat: category });
  };

  const handleAppSearch = (query) => {
    setSearchQuery(query);
    navigateTo('search', { searchQuery: query });
  };

  const handleGoToFavorites = () => {
      if (!user || user.isAnonymous) {
          showToast("Sign in to view favorites! 🔒", "error");
          return;
      }
      navigateTo('favorites');
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast("Logged out successfully", "success");
    } catch (error) {
      console.error("Error signing out:", error);
      showToast("Logout failed", "error");
    }
  }

  const commonProps = {
      username: user?.isAnonymous ? 'Guest' : (user?.email?.split('@')[0] || 'User'),
      onLogout: handleLogout,
      darkMode: dark,
      onToggleDarkMode: () => setDark(!dark),
      onImageClick: (img) => setSelectedImage(img),
      favorites: favorites,
      onToggleFavorite: toggleFavorite,
      onGoToFavorites: handleGoToFavorites,
      showToast: showToast,
      isGuest: user?.isAnonymous || false 
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
        isGuest={user?.isAnonymous || false}
      />

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {page === 'login' ? (
            <LoginPage />
        ) : page === 'category' && cat ? (
            <CategoryPage category={cat} onBack={() => window.history.back()} {...commonProps} />
        ) : page === 'search' && searchQuery ? (
            <SearchPage initialQuery={searchQuery} onBack={() => window.history.back()} {...commonProps} />
        ) : page === 'favorites' ? (  
            <FavoritesPage onBack={() => window.history.back()} {...commonProps} />
        ) : (
            <HomePage 
            onCategoryClick={handleCategoryClick} 
            onMainSearch={handleAppSearch}
            {...commonProps} 
            />
        )}
      </div>
    </>
  );
}