<div align="center">
  <br>
  <br>

![The package's logo showing a stamped red text stating "INVALID"](https://cdn.jsdelivr.net/gh/loilo/vue-invalidation-controller@HEAD/invalid.svg)

  <br>
</div>

# Vue Invalidation Controller

[![Test status on Travis](https://badgen.net/travis/loilo/vue-invalidation-controller)](https://travis-ci.org/loilo/vue-invalidation-controller)
[![Version on npm](https://badgen.net/npm/v/vue-invalidation-controller)](https://www.npmjs.com/package/vue-invalidation-controller)

The Invalidation Controller is a tiny class (less than 200 bytes gzipped) which enables you to manually force Vue [computed properties](https://vuejs.org/v2/guide/computed.html) to be re-evaluated. Its design is greatly inspired by the web API's [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

## Motivation

Nine out of ten times, you _don't want to use this package_. Manually invoking recomputations often violates the principle of [unidirectional data flow](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow).

However, since we don't live in a perfect world, there may be external entities in your application which are used as signaling devices rather than data sources.

That's what this package provides. It abstracts signals away, shielding you from creating reactive dummy counters that hold no valuable data and just increment for the sake of invalidating other properties.

## Installation

```bash
npm install vue-invalidation-controller
```

## Usage

This code is exclusively an example of how the `InvalidationController` class works. [**Do not do silly things like this.**](https://github.com/vuejs/vue/issues/214#issuecomment-57822806)

> You may also try out this example [on CodeSandbox](https://codesandbox.io/s/invalidation-controller-demo-wjof0).

```js
const Vue = require('vue')
const InvalidationController = require('vue-invalidation-controller')

new Vue({
  el: '#app',
  data: {
    // Instantiate the invalidation controller
    // Note that the controller instance doesn't *need* to be assigne dto a reactive property
    // on the Vue instance. We just put it here because we want to access it in our template.
    controller: new InvalidationController()
  },
  computed: {
    time() {
      // Mark the computed property as invalidatable
      this.controller.useSignal()

      return Date.now()
    }
  },
  template: `
    <div>
      Time: {{ time }}<br>
      <!-- Click the button to activate the invalidation signal: -->
      <button @click="controller.invalidate">Invalidate</button>
    </div>`
})
```

### Basic Recipe

1. Create an `InvalidationController` instance.
2. Call the `useSignal()` method inside a computed property definition to make it invalidatable.
3. Use the `invalidate()` method to re-evaluate all invalidatable computed properties.

### Advanced Features

- A controller's `invalidate()` method can be invoked more than once.
- The same controller instance can be used in more than one computed property — and even across multiple components.
- The `useSignal()` method works with Vue's built-in [dependency tracking](https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked). That's to say that, if needed, you may invoke that method inside of an `if`/`else` branch to conditionally make a computed property invalidatable.

## Related

- The [`vue-recomputed`](https://github.com/posva/vue-recomputed) package targets the same use case with a very different API design.
