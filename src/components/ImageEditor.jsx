import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import {  Check, X, Smartphone, Monitor, Loader2 } from 'lucide-react';
import getCroppedImg from '../utils/canvasUtils'; 

export default function ImageEditor({ imageSrc, onCancel, onSave }) {
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [blur, setBlur] = useState(0);
  
  // Aspect Ratio: 9/16 for Phone, 16/9 for Desktop
  const [aspect, setAspect] = useState(9 / 16); 
  
  // This stores the actual pixel coordinates for the Engine
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Callback when user stops dragging/zooming
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  //The Save Function
  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Run the Engine
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, blur);
      
      // Create a fake download link 
      const url = URL.createObjectURL(croppedImageBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wallpaper-edited-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close the editor
      onSave(); 
    } catch (e) {
      console.error(e);
      alert('Something went wrong editing the image');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col">
      {/*The Cropper Area */}
      <div className="relative flex-grow w-full bg-gray-900">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          // Style tweaks to match your dark theme
          style={{
            containerStyle: { background: '#0f172a' },
            cropAreaStyle: { border: '2px solid #3b82f6', color: 'rgba(0,0,0,0.5)' }
          }}
        />
      </div>

        {/*The Controls Area */}
      <div className="bg-gray-900/90 backdrop-blur-xl border-t border-white/10 p-6 space-y-6">
        
        {/* Aspect Ratio Buttons */}
        <div className="flex justify-center gap-4">
            <button 
                onClick={() => setAspect(9 / 16)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${aspect === 9/16 ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
            >
                <Smartphone size={16} /> Phone
            </button>
            <button 
                onClick={() => setAspect(16 / 9)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${aspect === 16/9 ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
            >
                <Monitor size={16} /> Desktop
            </button>
        </div>

        {/* Sliders for Blur & Zoom*/}
        <div className="space-y-4 max-w-md mx-auto">
            {/* Blur Slider */}
            <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-12 uppercase tracking-wider">Blur</span>
                <input 
                    type="range" 
                    min={0} max={10} step={1}
                    value={blur}
                    onChange={(e) => setBlur(e.target.value)}
                    className="flex-grow h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>
             {/* Zoom Slider */}
             <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-12 uppercase tracking-wider">Zoom</span>
                <input 
                    type="range" 
                    min={1} max={3} step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                    className="flex-grow h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>
        </div>

        {/* Action Buttons - Cancel / Save */}
        <div className="flex justify-between items-center pt-2">
            <button 
                onClick={onCancel}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            >
                <X size={24} />
            </button>

            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
                {isSaving ? <Loader2 className="animate-spin" /> : <Check size={20} />}
                <span>Save Wallpaper</span>
            </button>
        </div>
      </div>
    </div>
  );
}