export type AppId = 'file-explorer' | 'network-monitor' | 'witchcraft' | 'settings' | 'package-installer';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppConfig {
  id: AppId;
  name: string;
  icon: React.ReactNode;
  component: React.FC;
}

export interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
  content?: string;
  size?: string;
}

export interface Package {
  id: string;
  name: string;
  version: string;
  description: string;
  installed: boolean;
  category: string;
}