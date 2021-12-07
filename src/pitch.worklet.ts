import init, { DywaPitchTracker } from 'dywapitchtrack';
import { OverwriteBuffer } from '~/overwrite-buffer';

class PitchWorklet extends AudioWorkletProcessor {
  buffer: OverwriteBuffer;
  dywa: DywaPitchTracker | null = null;

  constructor() {
    super();
    this.buffer = new OverwriteBuffer(sampleRate);
    this.port.onmessage = async (e) => {
      const message = e.data;
      if (message.type === 'init') {
        const wasm = message.data;
        await init(wasm);
        this.dywa = new DywaPitchTracker();
        this.dywa.sample_rate_hz = sampleRate;
      } else if (message.type === 'pitch') {
        if (this.dywa) {
          const sampleCount = message.data as number;
          const pitch = this.dywa.compute_pitch(
            this.buffer.getBuffer(),
            this.buffer.getSize() - sampleCount,
            sampleCount,
          );
          this.port.postMessage({ type: 'pitch', message: pitch });
        }
      }
    };
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    this.buffer.add(inputs[0][0]);
    return true;
  }
}

registerProcessor('pitch-worklet', PitchWorklet);
