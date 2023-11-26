## Guides

### Create a new app

#### Initialization

Apps are initilized by using the `discore.init()` function, which will retun an `app` object. 

The app object will handle most of the interactions between your code and the discore library. To learn more about how to interact with the `app` object, see [the associated reference page](./pages/reference/app.md).

The only required parameter to create a discore app is `element`, which has to be an existing DOM element:
```js
const app = discore.init({
  element : document.getElementById('app')
})
```

It is possible to override the default `height`, `width` and `squareSize` by passing more parameters:
```js
const app = discore.init({
  element    : document.getElementById('app'),
  width      : window.innerWidth,
  height     : window.innerHeight,
  squareSize : 200
})
```
