import React, { useState } from 'react';
import { Folder, FileText, HardDrive, ChevronRight, ArrowLeft } from 'lucide-react';
import { FileSystemNode } from '../../types';

const INITIAL_FS: FileSystemNode = {
  id: 'root',
  name: 'Root',
  type: 'folder',
  children: [
    {
      id: 'home',
      name: 'home',
      type: 'folder',
      children: [
        {
          id: 'user',
          name: 'user',
          type: 'folder',
          children: [
            { id: 'docs', name: 'Documents', type: 'folder', children: [] },
            { id: 'pics', name: 'Pictures', type: 'folder', children: [] },
            { id: 'todo', name: 'todo.txt', type: 'file', size: '2 KB' },
            { id: 'notes', name: 'notes.md', type: 'file', size: '14 KB' },
          ]
        }
      ]
    },
    {
      id: 'etc',
      name: 'etc',
      type: 'folder',
      children: [
        { id: 'hosts', name: 'hosts', type: 'file', size: '4 KB' },
        { id: 'resolv', name: 'resolv.conf', type: 'file', size: '1 KB' }
      ]
    },
    {
      id: 'var',
      name: 'var',
      type: 'folder',
      children: [
        { id: 'log', name: 'log', type: 'folder', children: [] }
      ]
    }
  ]
};

export const FileExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<FileSystemNode[]>([INITIAL_FS]);
  
  const currentFolder = currentPath[currentPath.length - 1];

  const handleNavigate = (node: FileSystemNode) => {
    if (node.type === 'folder') {
      setCurrentPath([...currentPath, node]);
    }
  };

  const handleUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  return (
    <div className="flex h-full flex-col text-slate-200">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-slate-800 border-b border-slate-700 space-x-2">
        <button 
          onClick={handleUp}
          disabled={currentPath.length <= 1}
          className={`p-1 rounded ${currentPath.length <= 1 ? 'text-slate-600' : 'hover:bg-slate-700 text-slate-300'}`}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-1 text-sm flex items-center">
          <span className="text-green-500 mr-2">➜</span>
          {currentPath.map((node, i) => (
            <React.Fragment key={node.id}>
              <span className="hover:text-white cursor-pointer" onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}>
                {node.name}
              </span>
              {i < currentPath.length - 1 && <ChevronRight size={14} className="mx-1 text-slate-500" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 bg-slate-800 border-r border-slate-700 p-2 hidden sm:block">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2 px-2">Places</div>
          <div 
            className="flex items-center px-2 py-1 hover:bg-slate-700 rounded cursor-pointer mb-1"
            onClick={() => setCurrentPath([INITIAL_FS])}
          >
            <HardDrive size={16} className="mr-2 text-slate-400" />
            <span className="text-sm">File System</span>
          </div>
          <div 
            className="flex items-center px-2 py-1 hover:bg-slate-700 rounded cursor-pointer"
            onClick={() => {
               // Quick hack to nav to home/user
               if(INITIAL_FS.children?.[0].children?.[0]) {
                   setCurrentPath([INITIAL_FS, INITIAL_FS.children[0], INITIAL_FS.children[0].children[0]]);
               }
            }}
          >
            <Folder size={16} className="mr-2 text-blue-400" />
            <span className="text-sm">Home</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 p-4 bg-slate-900">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {currentFolder.children && currentFolder.children.length > 0 ? (
              currentFolder.children.map((child) => (
                <div 
                  key={child.id}
                  className="flex flex-col items-center justify-center p-2 hover:bg-slate-800 border border-transparent hover:border-slate-700 rounded cursor-pointer group"
                  onDoubleClick={() => handleNavigate(child)}
                >
                  <div className="w-12 h-12 mb-2 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    {child.type === 'folder' ? (
                      <Folder size={40} className="fill-current text-blue-500" />
                    ) : (
                      <FileText size={40} className="text-slate-500" />
                    )}
                  </div>
                  <span className="text-xs text-center truncate w-full px-1">{child.name}</span>
                  {child.size && <span className="text-[10px] text-slate-500">{child.size}</span>}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-600 mt-10">
                Folder is empty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};