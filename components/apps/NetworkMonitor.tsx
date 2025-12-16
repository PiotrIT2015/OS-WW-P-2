import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Wifi, ShieldCheck, Globe } from 'lucide-react';

const generateData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: i,
      upload: Math.floor(Math.random() * 50) + 10,
      download: Math.floor(Math.random() * 100) + 20,
    });
  }
  return data;
};

export const NetworkMonitor: React.FC = () => {
  const [data, setData] = useState(generateData());
  const [status, setStatus] = useState('Connected');
  const [ip] = useState('192.168.1.105');

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          upload: Math.floor(Math.random() * 60) + 5,
          download: Math.floor(Math.random() * 120) + 30,
        });
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-slate-700 bg-slate-800">
        <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center">
          <div className="bg-emerald-500/20 p-2 rounded-full mr-3">
            <Wifi size={20} className="text-emerald-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Status</div>
            <div className="text-sm font-bold text-emerald-400">{status}</div>
          </div>
        </div>
        <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center">
          <div className="bg-blue-500/20 p-2 rounded-full mr-3">
            <Globe size={20} className="text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500">IP Address</div>
            <div className="text-sm font-bold">{ip}</div>
          </div>
        </div>
        <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center">
          <div className="bg-purple-500/20 p-2 rounded-full mr-3">
            <Activity size={20} className="text-purple-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Latency</div>
            <div className="text-sm font-bold">24 ms</div>
          </div>
        </div>
        <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center">
          <div className="bg-orange-500/20 p-2 rounded-full mr-3">
            <ShieldCheck size={20} className="text-orange-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500">Firewall</div>
            <div className="text-sm font-bold">Active</div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-sm font-bold mb-4 text-slate-400 uppercase tracking-wider">Traffic Analysis (KB/s)</h3>
        <div className="flex-1 min-h-[200px] w-full bg-slate-800/50 rounded border border-slate-700 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} 
                itemStyle={{ fontSize: 12 }}
              />
              <Area type="monotone" dataKey="download" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Download" />
              <Area type="monotone" dataKey="upload" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Upload" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="h-32 bg-black border-t border-slate-700 p-2 font-mono text-xs overflow-y-auto text-green-500">
        <div>[SYSTEM] Network interface eth0 up and running.</div>
        <div>[SYSTEM] IPv4 assigned: {ip}</div>
        <div>[FIREWALL] Blocked incoming connection from 10.0.0.55:22</div>
        {data.slice(-3).map((d, i) => (
            <div key={i} className="text-slate-400">
                [TRAFFIC] In: {d.download}KB/s | Out: {d.upload}KB/s
            </div>
        ))}
      </div>
    </div>
  );
};