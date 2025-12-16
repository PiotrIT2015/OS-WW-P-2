import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { WindowState, AppId } from '../types';

interface WindowFrameProps {
  windowState: WindowState;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  updatePosition: (id: AppId, x: number, y: number) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  onClose,
  onMinimize,
  onFocus,
  updatePosition,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(windowState.id);
    if (windowRef.current) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - windowState.position.x,
        y: e.clientY - windowState.position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        updatePosition(windowState.id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, updatePosition, windowState.id]);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col bg-slate-800 border border-slate-600 rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      }}
      onMouseDown={() => onFocus(windowState.id)}
    >
      {/* Title Bar */}
      <div
        className="h-9 bg-slate-900 flex items-center justify-between px-3 cursor-move select-none border-b border-slate-700"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium text-slate-200">{windowState.title}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
          >
            <Minus size={14} />
          </button>
          <button className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white opacity-50 cursor-not-allowed">
            <Square size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(windowState.id); }}
            className="p-1 hover:bg-red-600 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-slate-900 relative">
        {children}
      </div>
    </div>
  );
};