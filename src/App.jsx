import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';

export default function WallpaperWebsite() {
  const [page, setPage] = useState('login');
  const [cat, setCat] = useState(null);
  const [user, setUser] = useState('');
  const [dark, setDark] = useState(false);

  if (page === 'login') return <LoginPage onLogin={u => { setUser(u); setPage('home'); }} />;
  
  if (page === 'category' && cat) {
    return (
      <CategoryPage 
        category={cat} 
        username={user} 
        onLogout={() => { setUser(''); setPage('login'); }} 
        onBack={() => setPage('home')} 
        darkMode={dark} 
        onToggleDarkMode={() => setDark(!dark)} 
      />
    );
  }

  return (
    <HomePage 
      username={user} 
      onLogout={() => { setUser(''); setPage('login'); }} 
      onCategoryClick={c => { setCat(c); setPage('category'); }} 
      darkMode={dark} 
      onToggleDarkMode={() => setDark(!dark)} 
    />
  );
}