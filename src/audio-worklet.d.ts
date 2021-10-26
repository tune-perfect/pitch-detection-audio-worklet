interface AudioWorkletProcessor {
  readonly port: MessagePort;
  readonly sampleRate: number;
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean;
}

declare const AudioWorkletProcessor: {
  prototype: AudioWorkletProcessor;
  new (options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
};

declare function registerProcessor<T extends AudioWorkletProcessorConstructor>(
  name: string,
  processorCtor: T,
);

declare const sampleRate: number;
