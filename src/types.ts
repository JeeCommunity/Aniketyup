export type ToolId = 
  | 'home' 
  | 'background-remover' 
  | 'compressor' 
  | 'resizer' 
  | 'converter' 
  | 'watermarker' 
  | 'palette';

export interface ToolItem {
  id: ToolId;
  title: string;
  description: string;
  category: 'AI' | 'Optimize' | 'Edit' | 'Convert';
  iconName: string;
  badge?: string;
  isPopular?: boolean;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  statusText: string;
  error?: string;
}
