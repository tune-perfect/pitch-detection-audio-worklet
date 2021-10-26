import init, { DywaPitchTracker } from 'dywapitchtrack';
import { OverwriteBuffer } from '~/overwrite-buffer';

class PitchWorklet extends AudioWorkletProcessor {
  buffer: OverwriteBuffer;
  dywa: DywaPitchTracker | null = null;

  constructor() {
    super();
    this.buffer = new OverwriteBuffer(sampleRate);
    this.port.onmessage = async (e) => {
      if (e.data[0] === 'init') {
        await init(e.data[1]);
        this.dywa = new DywaPitchTracker();
        this.dywa.sample_rate_hz = sampleRate;
      } else {
        if (this.dywa) {
          console.log(this.dywa.compute_pitch(this.buffer.get(), 0, 5000));
        }
      }
    };
    this.port.postMessage({ msg: 'Processor created on the audio thread.' });
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
