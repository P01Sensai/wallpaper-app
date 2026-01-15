import { UNSPLASH_CONFIG } from '../config/constants';

export const unsplashApi = {
  getRandomPhotos: async (count = 10, query = '') => {
    try {
      const url = query
        ? `${UNSPLASH_CONFIG.API_URL}/photos/random?count=${count}&query=${query}&client_id=${UNSPLASH_CONFIG.ACCESS_KEY}`
        : `${UNSPLASH_CONFIG.API_URL}/photos/random?count=${count}&client_id=${UNSPLASH_CONFIG.ACCESS_KEY}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
    } catch (error) {
      console.error('Unsplash API Error:', error);
      return [];
    }
  },

  searchPhotos: async (query, page = 1, perPage = 20) => {
    try {
      const url = `${UNSPLASH_CONFIG.API_URL}/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_CONFIG.ACCESS_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Unsplash Search Error:', error);
      return [];
    }
  }
};