import React, { useState } from 'react';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Search } from 'lucide-react';

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.bing.com');
  const [inputUrl, setInputUrl] = useState('https://www.bing.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dodaj http:// jeśli brakuje
    let finalUrl = inputUrl;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 text-slate-800">
      {/* Pasek narzędziowy */}
      <div className="bg-slate-200 p-2 flex items-center gap-2 border-b border-slate-300">
        <div className="flex gap-1 mr-2">
          <button className="p-1 hover:bg-slate-300 rounded"><ArrowLeft size={16} /></button>
          <button className="p-1 hover:bg-slate-300 rounded"><ArrowRight size={16} /></button>
          <button onClick={() => setUrl(url)} className="p-1 hover:bg-slate-300 rounded"><RotateCw size={16} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 flex items-center bg-white rounded-full px-3 py-1 border border-slate-400 focus-within:border-blue-500 shadow-sm">
          <Globe size={14} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent"
            placeholder="Wpisz adres URL lub szukaj..."
          />
          <Search size={14} className="text-slate-400 ml-2" />
        </form>
      </div>

      {/* Kontener Iframe */}
      <div className="flex-1 bg-white relative">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Web Browser"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
};