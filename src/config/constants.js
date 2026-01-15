export const UNSPLASH_CONFIG = {
  ACCESS_KEY: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  API_URL: 'https://api.unsplash.com'
};

export const CATEGORIES = [
  { name: 'Nature', icon: '🌿', color: 'from-green-400 to-emerald-500', query: 'nature,landscape' },
  { name: 'City', icon: '🏙️', color: 'from-blue-400 to-indigo-500', query: 'city,urban' },
  { name: 'Abstract', icon: '🎨', color: 'from-pink-400 to-rose-500', query: 'abstract,pattern' },
  { name: 'Animals', icon: '🦁', color: 'from-orange-400 to-amber-500', query: 'animals,wildlife' },
  { name: 'Technology', icon: '💻', color: 'from-violet-400 to-purple-500', query: 'technology,computer' },
  { name: 'Space', icon: '🚀', color: 'from-slate-400 to-gray-600', query: 'space,galaxy' }
];