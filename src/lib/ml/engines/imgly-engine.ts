import { MLEngine, MLModelOptions, EngineType } from '../types';
import { removeBackground as imglyRemove } from '@imgly/background-removal';

export const imglyEngine: MLEngine = {
  id: 'imgly' as EngineType,
  name: 'IMGLY Engine (ISNet)',
  description: 'High precision segmentation model running via WebAssembly',
  isAvailable: () => typeof window !== 'undefined',
  removeBackground: async (file: File, options?: MLModelOptions): Promise<Blob> => {
    const result = await imglyRemove(file, {
      progress: options?.progress ? (key: string, current: number, total: number) => {
        if (options.progress) options.progress(key, current, total);
      } : undefined
    });
    return result;
  }
};
