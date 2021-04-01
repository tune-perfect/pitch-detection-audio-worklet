class GainWorklet extends AudioWorkletProcessor {
  buffer: Float32Array

  constructor() {
    super()
    this.buffer = new Float32Array(48000)
    this.port.postMessage({ msg: 'Processor created on the audio thread.' })
  }

  static get parameterDescriptors() {
    return [
      { name: 'gainChannel_0', defaultValue: 0.5, minValue: 0, maxValue: 1, automationRate: 'k-rate' },
      { name: 'gainChannel_1', defaultValue: 1.0, minValue: 0, maxValue: 1, automationRate: 'k-rate' },
    ]
  }

  /**
   * Normally for gain you would just use a GainNode and possibly SplitterNode(s), but for
   * this example, we'll use this AudioWorklet processor to independently set the gain for each channel.
   *
   * see: https://developers.google.com/web/updates/2017/12/audio-worklet
   *
   * @param inputs
   * @param outputs
   * @param parameters
   * @returns {boolean}
   */
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
    const input = inputs[0]
    const output = outputs[0]

    // this.buffer = this.buffer.concat(input)
    // console.log(this.buffer)

    for (let channel = 0; channel < input.length; ++channel) {
      const inputChannel = input[channel]
      const outputChannel = output[channel]
      // parameters contains our audioParams for each channel
      const gain = parameters[`gainChannel_${channel}`]
      for (let i = 0; i < inputChannel.length; ++i) outputChannel[i] = inputChannel[i] * gain[0]
    }
    // uncomment to see when worklet is processing
    // this.port.postMessage({ msg: currentTime })
    return true
  }
}

registerProcessor('gain-worklet', GainWorklet)
