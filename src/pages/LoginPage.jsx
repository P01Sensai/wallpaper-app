import React, { useState, useEffect } from 'react';
import { Image, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';

// MASCOT COMPONENT 
const LoginMascot = ({ focusedInput, error }) => {
  const isPassword = focusedInput === 'password';
  return (
    <div className={`w-32 h-28 mx-auto mb-2 relative ${error ? 'animate-shake' : ''}`}>
       <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-xl">
          <circle cx="60" cy="60" r="35" fill="#3b82f6" /> 
          <circle cx="60" cy="60" r="30" fill="#60a5fa" />
          <circle cx="35" cy="35" r="12" fill="#3b82f6" />
          <circle cx="85" cy="35" r="12" fill="#3b82f6" />
          <circle cx="35" cy="35" r="6" fill="#1d4ed8" />
          <circle cx="85" cy="35" r="6" fill="#1d4ed8" />
          <ellipse cx="60" cy="70" rx="14" ry="10" fill="#eff6ff" />
          <path d="M56 68 Q60 74 64 68" stroke="#1e3a8a" strokeWidth="2" fill="none" />
          <ellipse cx="60" cy="66" rx="4" ry="3" fill="#1e3a8a" />
          {!isPassword && (
              <g className="transition-all duration-300">
                  <circle cx="50" cy="55" r="4" fill="#1e40af" />
                  <circle cx="70" cy="55" r="4" fill="#1e40af" />
                  <circle cx="51" cy="53" r="1.5" fill="white" />
                  <circle cx="71" cy="53" r="1.5" fill="white" />
              </g>
          )}
          <g className={`transition-all duration-500 ease-in-out ${isPassword ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <circle cx="45" cy="50" r="12" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
             <path d="M45 50 Q48 55 42 58" stroke="#1d4ed8" strokeWidth="2" fill="none" opacity="0.5" />
             <circle cx="75" cy="50" r="12" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
             <path d="M75 50 Q78 55 72 58" stroke="#1d4ed8" strokeWidth="2" fill="none" opacity="0.5" />
          </g>
       </svg>
    </div>
  );
};

//  MAIN PAGE 
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920",
      title: "Curating Masterpieces",
      desc: "Discover the world's most breathtaking visuals."
    },
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1920", 
      title: "Premium Quality",
      desc: "Every pixel matters. Experience 4K clarity."
    },
    {
      url: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920",
      title: "Join the Community",
      desc: "Save and share your collections effortlessly."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'password') {
        onLogin(username);
    } else {
        setError('Invalid credentials. Try: admin / password');
        setPassword('');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black relative overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_50%)] animate-spin-slow"></div>
          <div className="absolute top-[20%] right-[20%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] animate-pulse"></div>
          <div className="absolute inset-0 opacity-[0.15]" 
               style={{ 
                   backgroundImage: 'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)', 
                   backgroundSize: '50px 50px' 
               }}>
          </div>
      </div>

      {/* LEFT SIDE: LOGO + CAROUSEL */}
      {/* Changed to flex-col justify-between so Logo is at top, Carousel in middle */}
      <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-between p-12">
        
        {/* LOGO HEADER (Top Left of Screen) */}
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                <Image className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight drop-shadow-md">WallpaperHub</span>
        </div>

        {/* CAROUSEL (Middle, Large) */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Carousel Images */}
            {slides.map((slide, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img src={slide.url} alt="Slide" className="w-full h-full object-cover" />
                </div>
            ))}

            {/* Vignette & Overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_40px_rgba(0,0,0,0.8)] z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10"></div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                 {slides.map((slide, index) => (
                    <div 
                        key={index}
                        className={`transition-all duration-700 absolute bottom-12 left-8 right-8 ${
                            index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                        }`}
                    >
                        <h2 className="text-4xl font-bold text-white mb-3 leading-tight drop-shadow-lg">{slide.title}</h2>
                        <p className="text-lg text-gray-300 drop-shadow-md max-w-lg">{slide.desc}</p>
                    </div>
                 ))}
                 
                 {/* Slide Dots */}
                 <div className="flex gap-2 mt-24 pl-1"> 
                    {slides.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-gray-600'
                            }`} 
                        />
                    ))}
                 </div>
            </div>
        </div>

        {/* FOOTER */}
        <div className="text-gray-500 text-sm">
            © 2026 Pramanshu. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 px-6">
        
        <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative group">
            
            <div className="absolute -top-20 left-0 right-0 flex justify-center pointer-events-none">
                 <LoginMascot focusedInput={focusedInput} error={error} />
            </div>

            <div className="relative mt-4">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Enter your details to access your collection</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setFocusedInput('username')}
                                onBlur={() => setFocusedInput(null)}
                                className={`block w-full pl-11 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:ring-blue-500/50 focus:border-blue-500'}`}
                                placeholder="admin"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <span className="text-xs text-gray-500">(Hint: password)</span>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                                className={`block w-full pl-11 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:ring-blue-500/50 focus:border-blue-500'}`}
                                placeholder="password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-500/25 group"
                    >
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Don't have an account?{' '}
                        <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Create one now
                        </button>
                    </p>
                </div>
            </div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
            animation: spin 15s linear infinite;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .animate-shake {
            animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;