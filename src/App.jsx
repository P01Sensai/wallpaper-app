import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';

export default function WallpaperWebsite() {
  // Possible states: 'login', 'home', 'category', 'search'
  const [page, setPage] = useState('login');
  const [cat, setCat] = useState(null);
  // Add state to hold the search term
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState('');
  const [dark, setDark] = useState(false);

  //Create the handler that switches to the search page
  const handleAppSearch = (query) => {
    setSearchQuery(query); // Save the query string
    setPage('search');     // Switch the view
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


  // ROUTING LOGIC

  if (page === 'login') {
    return <LoginPage onLogin={u => { setUser(u); setPage('home'); }} />;
  }
  
  if (page === 'category' && cat) {
    return (
      <CategoryPage 
        category={cat} 
        username={user} 
        onLogout={handleLogout} 
        onBack={handleBackToHome} 
        darkMode={dark} 
        onToggleDarkMode={() => setDark(!dark)} 
      />
    );
  }

  //Add the new 'search' route condition
  if (page === 'search' && searchQuery) {
    return (
      <SearchPage
        initialQuery={searchQuery} // Pass the stored query
        username={user}
        onLogout={handleLogout}
        onBack={handleBackToHome}
        darkMode={dark}
        onToggleDarkMode={() => setDark(!dark)}
      />
    )
  }

  return (
    <HomePage 
      username={user} 
      onLogout={handleLogout} 
      onCategoryClick={c => { setCat(c); setPage('category'); }} 
      //Pass the new search handler down to HomePage
      onMainSearch={handleAppSearch}
      darkMode={dark} 
      onToggleDarkMode={() => setDark(!dark)} 
    />
  );
}