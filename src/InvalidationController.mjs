import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    // Use a function value to
    // a) guarantee invalidation (as functions cannot be compared)
    // b) grant safe access in useSignal() without possibly being stripped by minifiers
    signal: () => {}
  }),
  methods: {
    invalidate() {
      this.signal = () => {}
    },
    useSignal() {
      this.signal()
    }
  }
})
