import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { FloatingParticles } from '../components/SharedUI';

const AnimatedCharacter = ({ isTypingPassword, characterMood }) => {
  const eyePos = isTypingPassword ? 'justify-end pr-1' : 'justify-center';
  return (
    <div className="relative">
      <div className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full relative shadow-xl">
        <div className="absolute top-10 left-8 flex gap-6">
          <div className={`w-4 h-4 bg-gray-900 rounded-full flex ${eyePos} items-center transition-all duration-300`}>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>
          <div className={`w-4 h-4 bg-gray-900 rounded-full flex ${eyePos} items-center transition-all duration-300`}>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 border-b-2 border-yellow-400 w-8 h-4 rounded-b-full"></div>
      </div>
      {!isTypingPassword && <div className="absolute -right-12 top-16 animate-bounce text-4xl">👉</div>}
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const [typing, setTyping] = useState(false);

  const login = () => {
    if (user === 'admin' && pass === 'password') onLogin(user);
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <FloatingParticles darkMode={false} />
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="flex justify-center mb-8"><AnimatedCharacter isTypingPassword={typing} characterMood={err ? 'wrong' : 'welcome'} /></div>
          <h1 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">Welcome Back! <Sparkles className="w-6 h-6 text-yellow-500" /></h1>
          <p className="text-gray-600 text-center mb-8">Login to explore amazing wallpapers</p>
          <div className="space-y-4">
            <input type="text" value={user} onChange={e => setUser(e.target.value)} onKeyPress={e => e.key === 'Enter' && login()} placeholder="Username" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} onFocus={() => setTyping(true)} onBlur={() => setTyping(false)} onKeyPress={e => e.key === 'Enter' && login()} placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            {err && <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-600 text-sm">Invalid credentials! Try again.</div>}
            <button onClick={login} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 active:scale-95 transition-all shadow-lg">Login</button>
            <p className="text-center text-sm text-gray-500">Demo: username: <span className="font-semibold">admin</span> | password: <span className="font-semibold">password</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;