import merge from 'deepmerge'
import base from './rollup-base.js'

export default merge(base, {
  output: {
    file: 'dist/InvalidationController.esm.js',
    format: 'es'
  }
})
