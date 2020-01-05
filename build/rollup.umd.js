import merge from 'deepmerge'
import base from './rollup-base.js'

export default merge(base, {
  output: {
    globals: {
      vue: 'Vue'
    },
    file: 'dist/InvalidationController.umd.js',
    format: 'umd',
    name: 'VueInvalidationController'
  }
})
