import { MLEngine, EngineType, MLModelOptions, EngineResult } from './types';
import { imglyEngine } from './engines/imgly-engine';
import { onnxEngine } from './engines/onnx-engine';

class EngineRegistry {
  private engines: Map<EngineType, MLEngine> = new Map();

  constructor() {
    this.register(onnxEngine);
    this.register(imglyEngine);
  }

  register(engine: MLEngine) {
    this.engines.set(engine.id, engine);
  }

  get(id: EngineType): MLEngine | undefined {
    return this.engines.get(id);
  }

  getAll(): MLEngine[] {
    return Array.from(this.engines.values());
  }

  async processWithFallback(file: File, preferredEngine: EngineType = 'bg0', options?: MLModelOptions): Promise<EngineResult> {
    const startTime = performance.now();
    const primary = this.get(preferredEngine) || onnxEngine;

    try {
      const blob = await primary.removeBackground(file, options);
      const durationMs = performance.now() - startTime;
      return { blob, durationMs, engineUsed: primary.id };
    } catch (primaryErr) {
      console.warn(`Primary engine ${primary.id} failed, attempting fallback...`, primaryErr);
      const fallback = primary.id === 'bg0' ? imglyEngine : onnxEngine;
      const blob = await fallback.removeBackground(file, options);
      const durationMs = performance.now() - startTime;
      return { blob, durationMs, engineUsed: fallback.id };
    }
  }
}

export const engineRegistry = new EngineRegistry();
