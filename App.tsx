import React, { useState } from 'react';
import { AppConfig, WindowState, AppId } from './types';
import { WindowFrame } from './components/WindowFrame';
import { Package, Folder, Settings as SettingsIcon, Activity, Music, Power, Menu, Wifi } from 'lucide-react';

// Apps
import { FileExplorer } from './components/apps/FileExplorer';
import { NetworkMonitor } from './components/apps/NetworkMonitor';
import { WitchCraft } from './components/apps/WitchCraft';
import { Settings } from './components/apps/Settings';
import { PackageInstaller } from './components/apps/PackageInstaller';
import { Browser } from './components/apps/Browser';
import { Globe } from 'lucide-react'; // Importuj ikonę dla paska zadań

const APPS: AppConfig[] = [
  { 
    id: 'file-explorer', 
    name: 'File Explorer', 
    icon: <img src="/icons/folder.png" alt="" className="w-full h-full object-contain" />, 
    component: FileExplorer },
    { 
    id: 'browser', 
    name: 'Web Browser', 
    icon: <img src="/icons/browser.png" alt="" className="w-full h-full object-contain" />, 
    component: Browser 
  },
  { 
    id: 'witchcraft', 
    name: 'WitchCraft', 
    icon: <img src="/icons/musical-note.png" alt="" className="w-full h-full object-contain" />, 
    component: WitchCraft },
  { 
    id: 'network-monitor', 
    name: 'Network Monitor', 
    icon: <img src="/icons/network-monitor.png" alt="" className="w-full h-full object-contain" />, 
    component: NetworkMonitor },
  { 
    id: 'package-installer', 
    name: 'Package Manager', 
    icon: <img src="/icons/package-manager.png" alt="" className="w-full h-full object-contain" />, 
    component: PackageInstaller },
  { 
    id: 'settings', 
    name: 'Settings', 
    icon: <img src="/icons/settings.png" alt="" className="w-full h-full object-contain" />, 
    component: Settings }, 
];

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(10);

  const openApp = (appId: AppId) => {
    const existingWindow = windows.find(w => w.id === appId);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w));
        setNextZIndex(prev => prev + 1);
      } else {
        // Just bring to front
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, zIndex: nextZIndex } : w));
        setNextZIndex(prev => prev + 1);
      }
      setActiveWindowId(appId);
    } else {
      const appConfig = APPS.find(a => a.id === appId);
      if (!appConfig) return;

      const newWindow: WindowState = {
        id: appId,
        title: appConfig.name,
        isOpen: true,
        isMinimized: false,
        zIndex: nextZIndex,
        position: { x: 50 + (windows.length * 30), y: 50 + (windows.length * 30) },
        size: { width: 800, height: 600 }
      };
      
      setWindows([...windows, newWindow]);
      setNextZIndex(prev => prev + 1);
      setActiveWindowId(appId);
    }
    setStartMenuOpen(false);
  };

  const closeWindow = (id: AppId) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const updateWindowPosition = (id: AppId, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  const focusWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  // Clock
  const [time, setTime] = useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#3d405b] relative font-sans">
        
        {/* Desktop Area / Wallpaper */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/1920/1080)' }}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
            
            {/* Desktop Icons */}
            <div className="absolute top-4 left-4 grid gap-6">
                {APPS.map(app => (
                    <div 
                        key={app.id}
                        className="flex flex-col items-center justify-center w-24 group cursor-pointer"
                        onDoubleClick={() => openApp(app.id)}
                    >
                        <div className="w-14 h-14 bg-slate-800/80 backdrop-blur rounded-xl flex items-center justify-center shadow-lg group-hover:bg-slate-700/90 transition-all text-white">
                            {/* TUTAJ ZMIANA: Usunięto React.cloneElement */}
                            {app.icon}
                        </div>
                        <span className="mt-2 text-xs font-medium text-white shadow-black drop-shadow-md text-center">{app.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Windows Layer */}
        {windows.map(window => {
            const AppComp = APPS.find(a => a.id === window.id)?.component;
            if (!AppComp) return null;
            return (
                <WindowFrame
                    key={window.id}
                    windowState={window}
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    onFocus={focusWindow}
                    updatePosition={updateWindowPosition}
                >
                    <AppComp />
                </WindowFrame>
            );
        })}

        {/* Start Menu */}
        {startMenuOpen && (
            <div className="absolute bottom-12 left-2 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
                <div className="p-4 bg-slate-900 border-b border-slate-700 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">S</div>
                    <div>
                        <div className="text-sm font-bold text-white">Secure User</div>
                        <div className="text-xs text-slate-400">Administrator</div>
                    </div>
                </div>
                <div className="p-2 py-3 space-y-1">
                    {APPS.map(app => (
                        <button 
                            key={app.id}
                            onClick={() => openApp(app.id)}
                            className="w-full text-left px-3 py-2 text-slate-200 hover:bg-slate-700 rounded flex items-center space-x-3 transition-colors"
                        >
                            {app.icon}
                            <span className="text-sm">{app.name}</span>
                        </button>
                    ))}
                    <div className="h-px bg-slate-700 my-2"></div>
                    <button className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-700 rounded flex items-center space-x-3 transition-colors">
                        <Power size={18} />
                        <span className="text-sm">Shut Down</span>
                    </button>
                </div>
            </div>
        )}

        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-11 bg-slate-900/95 backdrop-blur border-t border-slate-700 flex items-center px-2 z-50 justify-between">
            <div className="flex items-center space-x-2 h-full py-1">
                <button 
                    onClick={() => setStartMenuOpen(!startMenuOpen)}
                    className={`h-full px-3 rounded flex items-center justify-center transition-colors ${startMenuOpen ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                    <Menu size={20} />
                </button>
                
                <div className="w-px h-6 bg-slate-700 mx-2"></div>

                {/* Running Apps */}
                {windows.map(window => {
                    const appInfo = APPS.find(a => a.id === window.id);
                    return (
                        <button
                            key={window.id}
                            onClick={() => openApp(window.id)}
                            className={`h-full px-3 min-w-[120px] max-w-[200px] flex items-center space-x-2 rounded border-b-2 transition-all ${
                                activeWindowId === window.id && !window.isMinimized
                                ? 'bg-slate-800 border-blue-500 text-white' 
                                : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800'
                            }`}
                        >
                            {appInfo?.icon}
                            <span className="text-xs truncate">{appInfo?.name}</span>
                        </button>
                    )
                })}
            </div>

            {/* System Tray */}
            <div className="flex items-center space-x-4 px-2 text-slate-400 text-xs">
                 <div className="flex items-center hover:text-white cursor-pointer"><Wifi size={16} /></div>
                 <div className="flex items-center hover:text-white cursor-pointer"><SettingsIcon size={16} /></div>
                 <div className="flex flex-col items-end leading-none cursor-default select-none">
                    <span className="font-bold">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <span className="text-[10px]">{time.toLocaleDateString()}</span>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default App;