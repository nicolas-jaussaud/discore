## Guides

### Load maps

- [Structure](#usage)
- [Load map](#load-map)

#### Structure

Maps are javascript object, with a structure similar to this one:
```javascript
const map = {
  '1|-1'  : { type: 'colored-plane', config: { color: 0x333333 } },
  '0|1'   : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '1|1'   : { type: 'colored-plane', config: { color: 0x333333 } },
  '1|0'   : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '0|0'   : { type: 'colored-plane', config: { color: 0x333333 } },
  '-1|0'  : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '-1|-1' : { type: 'colored-plane', config: { color: 0x333333 } },
  '0|-1'  : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '-1|1'  : { type: 'colored-plane', config: { color: 0x333333 } },
}
```

In this example, we use the map and the `colored-plane` square type from the [quick start example](./pages/examples/quick-start.md).

Each key of the `map` object represent the position of a square, with the following format: `{x}|{y}`.

If we generate the map from the example above, the squares will be positioned like this:

<div style="display: flex; justify-content: center">   

|          |          |  **+y**  |          |          |
|:--------:|:--------:|:--------:|:--------:|:--------:|
|          | `-1\|1`  |  `1\|0`  |  `1\|1`  |          |
|  **-x**  | `-1\|0`  |  `0\|0`  |  `1\|0`  |  **+x**  |
|          | `-1\|-1` | `-1\|0`  | `-1\|1`  |          |
|          |          |  **-y**  |          |          |

</div>

#### Load map

Before loading a map, your main characters needs to be loaded. More about this in the [load character guide](./pages/guides/load-characters.md).

A map can be loaded with the `app.map.load` function:
```
app.map.load('map-name', map, '0|0')
```

The last parameter is the square where the main character needs to be initially loaded.

There is more information about the `app.map` object in the [associated reference page](./pages/reference/app.map.md).



