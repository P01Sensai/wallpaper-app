import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const Carousel = ({ slides, currentSlide, onNext, onPrev, onDotClick }) => (
  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
    <div className="relative h-96">
      {slides.map((s, i) => (
        <div key={s.id} className={`absolute inset-0 transition-all duration-700 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <img src={s.urls?.regular || s.url} alt={s.alt_description || 'Trending Wallpaper'} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm text-blue-200 font-medium">Featured</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{s.alt_description || 'Beautiful Wallpaper'}</h3>
            <p className="text-blue-200 text-sm">by {s.user?.name || 'Unknown'}</p>
          </div>
        </div>
      ))}
    </div>
    <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
    <ChevronLeft className="w-6 h-6" />
    </button>
    <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">
    <ChevronRight className="w-6 h-6" />
    </button>
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {slides.map((_, i) => <button key={i} onClick={() => onDotClick(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'}`} />)}
    </div>
  </div>
);

export default Carousel;