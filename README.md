# Pitch Detection Audio Worklet

The audio worklet is available as a npm library and will be automatically installed when setting up the [main project](https://github.com/tune-perfect/tune-perfect-web).

### Technologies
The worklet is written in TypeScript and JavaScript.
It uses [Rollup](https://rollupjs.org/) to bundle the project.  
The worklet uses [dywapitchtrack-rust](https://github.com/ZerNico/dywapitchtrack-rust) to calculate the pitch for the current audio samples. dywapitchtrack-rust is a port of the dywapitchtrack algorithm to rust/webassembly.

### Credits
* [dywapitchtrack](https://github.com/antoineschmitt/dywapitchtrack)
