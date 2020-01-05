import { terser } from 'rollup-plugin-terser'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/InvalidationController.mjs',
  external: ['vue'],
  output: {
    interop: false,
    sourcemap: true
  },
  plugins: [nodeResolve(), terser()]
}
