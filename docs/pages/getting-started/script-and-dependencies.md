## Getting started

### Script and dependencies

#### Discore script

Currently, the only way to use discore is to required the build script:
```html
<script src="https://nicolas-jaussaud.github.io/discore/build/discore.min.js"></script>
```

The script can be downloaded from the discore repository on github: https://github.com/nicolas-jaussaud/discore/tree/main/build

#### Access threejs objects

There is no need to include additional dependencies for threejs, as it's already bundled in the discore scripts.

It's possible to access it from the `window.discore` object with the following code:
```js
const { THREE } = discore

const vector = new THREE.Vector3( 0, 0, 0 )
```
