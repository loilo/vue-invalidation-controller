const Vue = require('vue')
const InvalidationController = require('./dist/InvalidationController.common.js')

it('should be instantable', () => {
  expect(new InvalidationController()).toBeInstanceOf(Vue)
})

it('should force computed properties to re-evaluate', () => {
  const ctrl = new InvalidationController()
  const evaluate = jest.fn()

  const vm = new Vue({
    computed: {
      value() {
        ctrl.useSignal()
        evaluate()
      }
    }
  })

  // Computed property has not been used yet
  expect(evaluate).toHaveBeenCalledTimes(0)

  // Access computed property
  vm.value
  expect(evaluate).toHaveBeenCalledTimes(1)

  // Computed property should be served from cache
  vm.value
  expect(evaluate).toHaveBeenCalledTimes(1)

  // Invalidating in itself should not re-evaluate the property
  ctrl.invalidate()
  expect(evaluate).toHaveBeenCalledTimes(1)

  // Access computed property again to re-evaluate it
  vm.value
  expect(evaluate).toHaveBeenCalledTimes(2)
})

it('should force multiple computed properties to re-evaluate through the same signal', () => {
  const ctrl = new InvalidationController()
  const evaluate1 = jest.fn()
  const evaluate2 = jest.fn()

  const vm = new Vue({
    computed: {
      value1() {
        ctrl.useSignal()
        evaluate1()
      },
      value2() {
        ctrl.useSignal()
        evaluate2()
      }
    }
  })

  // Access computed property
  expect(vm.value1).toBeUndefined()
  expect(vm.value2).toBeUndefined()
  expect(evaluate1).toHaveBeenCalledTimes(1)
  expect(evaluate2).toHaveBeenCalledTimes(1)

  // Invalidate computed property
  ctrl.invalidate()
  expect(vm.value1).toBeUndefined()
  expect(vm.value2).toBeUndefined()
  expect(evaluate1).toHaveBeenCalledTimes(2)
  expect(evaluate2).toHaveBeenCalledTimes(2)
})

it('should only come into effect inside a used branch', () => {
  const ctrl = new InvalidationController()
  const evaluate = jest.fn()

  const vm = new Vue({
    data: {
      shouldUseSignal: true
    },
    computed: {
      value() {
        if (this.shouldUseSignal) {
          ctrl.useSignal()
        }

        evaluate()
      }
    }
  })

  // Access computed property
  vm.value
  expect(evaluate).toHaveBeenCalledTimes(1)

  // Invalidate the property
  ctrl.invalidate()
  vm.value
  expect(evaluate).toHaveBeenCalledTimes(2)

  // Turn off signal branch, invalidates the property
  vm.shouldUseSignal = false
  vm.value
  expect(evaluate).toHaveBeenCalledTimes(3)

  // Invoking invalidation should have no effect now
  ctrl.invalidate()
  vm.value
  expect(evaluate).toHaveBeenCalledTimes(3)
})
