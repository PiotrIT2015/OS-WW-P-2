import React, { useState } from 'react';
import { Package, Search, Download, Check, RefreshCw, Terminal } from 'lucide-react';
import { Package as PackageType } from '../../types';

const MOCK_PACKAGES: PackageType[] = [
  { id: '1', name: 'neofetch', version: '7.1.0', description: 'CLI system information tool written in BASH', installed: true, category: 'Utils' },
  { id: '2', name: 'htop', version: '3.0.5', description: 'Interactive process viewer', installed: true, category: 'System' },
  { id: '3', name: 'gimp', version: '2.10.24', description: 'GNU Image Manipulation Program', installed: false, category: 'Graphics' },
  { id: '4', name: 'vlc', version: '3.0.16', description: 'Multimedia player and framework', installed: false, category: 'Media' },
  { id: '5', name: 'python3', version: '3.9.2', description: 'Interpreted, interactive, object-oriented programming language', installed: true, category: 'Dev' },
  { id: '6', name: 'docker.io', version: '20.10.5', description: 'Linux container runtime', installed: false, category: 'Dev' },
  { id: '7', name: 'firefox-esr', version: '78.15.0', description: 'Mozilla Firefox web browser', installed: true, category: 'Web' },
  { id: '8', name: 'code', version: '1.60.0', description: 'Code editing. Redefined.', installed: false, category: 'Dev' },
];

export const PackageInstaller: React.FC = () => {
  const [packages, setPackages] = useState<PackageType[]>(MOCK_PACKAGES);
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);

  const toggleInstall = (pkgId: string) => {
    setProcessing(pkgId);
    
    // Simulate apt delay
    setTimeout(() => {
      setPackages(prev => prev.map(p => {
        if (p.id === pkgId) {
          return { ...p, installed: !p.installed };
        }
        return p;
      }));
      setProcessing(null);
    }, 1500);
  };

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      {/* Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
            <div className="bg-orange-600 p-2 rounded">
                <Package size={24} className="text-white" />
            </div>
            <div>
                <h2 className="text-lg font-bold">Synaptic Package Manager</h2>
                <p className="text-xs text-slate-400">Debian Repository Main</p>
            </div>
        </div>
        <div className="flex space-x-2">
            <button className="flex items-center px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm border border-slate-600">
                <RefreshCw size={14} className="mr-2" /> Update
            </button>
            <button className="flex items-center px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm border border-slate-600">
                <Terminal size={14} className="mr-2" /> Log
            </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 bg-slate-800/50 border-b border-slate-700">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
            <input 
                type="text" 
                placeholder="Search packages..." 
                className="w-full bg-slate-900 border border-slate-600 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-orange-500 text-white placeholder-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto p-2">
        <div className="grid grid-cols-1 gap-1">
            <div className="grid grid-cols-12 px-4 py-2 text-xs font-bold text-slate-500 uppercase">
                <div className="col-span-1">Status</div>
                <div className="col-span-3">Package</div>
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Action</div>
            </div>
            {filteredPackages.map(pkg => (
                <div key={pkg.id} className="grid grid-cols-12 items-center bg-slate-800/50 hover:bg-slate-700 p-3 rounded border border-slate-700/50 transition-colors">
                    <div className="col-span-1">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${pkg.installed ? 'bg-green-500 border-green-600' : 'bg-slate-900 border-slate-600'}`}>
                            {pkg.installed && <Check size={10} className="text-white" />}
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="font-bold text-sm text-orange-400">{pkg.name}</div>
                        <div className="text-xs text-slate-500">{pkg.version} • {pkg.category}</div>
                    </div>
                    <div className="col-span-6 text-sm text-slate-300 truncate pr-2">
                        {pkg.description}
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <button 
                            onClick={() => toggleInstall(pkg.id)}
                            disabled={!!processing}
                            className={`flex items-center px-3 py-1.5 rounded text-xs font-medium transition-all ${
                                processing === pkg.id ? 'bg-slate-600 cursor-wait' :
                                pkg.installed 
                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30' 
                                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'
                            }`}
                        >
                            {processing === pkg.id ? (
                                <RefreshCw size={14} className="animate-spin" />
                            ) : pkg.installed ? (
                                'Remove'
                            ) : (
                                <><Download size={14} className="mr-1" /> Install</>
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
      
      <div className="bg-slate-900 p-1 border-t border-slate-700 text-[10px] text-slate-500 flex justify-between px-4">
        <span>{filteredPackages.length} packages listed</span>
        <span>0 broken</span>
      </div>
    </div>
  );
};