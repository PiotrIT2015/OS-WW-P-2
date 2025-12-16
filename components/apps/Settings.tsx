import React from 'react';
import { Monitor, Cpu, HardDrive, Wifi, Lock } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="h-full flex bg-slate-900 text-slate-200">
      {/* Sidebar */}
      <div className="w-48 bg-slate-800 border-r border-slate-700 p-4">
        <h2 className="text-xl font-bold mb-6 text-white px-2">Settings</h2>
        <nav className="space-y-1">
          <button className="w-full flex items-center px-3 py-2 bg-blue-600 text-white rounded-md shadow-lg shadow-blue-500/20">
            <Monitor size={18} className="mr-3" /> System
          </button>
          <button className="w-full flex items-center px-3 py-2 text-slate-400 hover:bg-slate-700 hover:text-white rounded-md">
            <Wifi size={18} className="mr-3" /> Network
          </button>
          <button className="w-full flex items-center px-3 py-2 text-slate-400 hover:bg-slate-700 hover:text-white rounded-md">
            <Lock size={18} className="mr-3" /> Security
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h3 className="text-2xl font-light mb-6 border-b border-slate-700 pb-2">System Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center mb-4">
                    <Cpu size={24} className="text-blue-500 mr-3" />
                    <h4 className="text-lg font-medium">Hardware</h4>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex justify-between border-b border-slate-700/50 pb-2">
                        <span className="text-slate-500">Processor</span>
                        <span>Virtual Core i7 @ 3.2GHz</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/50 pb-2">
                        <span className="text-slate-500">Memory</span>
                        <span>16 GB DDR4</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700/50 pb-2">
                        <span className="text-slate-500">Graphics</span>
                        <span>Simulated GPU Adapter</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center mb-4">
                    <HardDrive size={24} className="text-emerald-500 mr-3" />
                    <h4 className="text-lg font-medium">Storage</h4>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Main Drive (/)</span>
                        <span className="text-slate-400">45 GB / 120 GB</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[35%]"></div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 md:col-span-2">
                <div className="flex items-center mb-4">
                    <Monitor size={24} className="text-purple-500 mr-3" />
                    <h4 className="text-lg font-medium">OS Details</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                     <div className="flex flex-col">
                        <span className="text-slate-500 text-xs uppercase">Kernel</span>
                        <span>Linux 5.10.0-8-amd64</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-slate-500 text-xs uppercase">Distro</span>
                        <span>SecureOS (Debian 11 Bullseye Base)</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-slate-500 text-xs uppercase">Uptime</span>
                        <span>14 days, 3 hours</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-slate-500 text-xs uppercase">Hostname</span>
                        <span>secure-node-01</span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};