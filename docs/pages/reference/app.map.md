## Reference

### app.map

#### Overview

- [app.map.current](#app.map.current)
- [app.map.getCoordinateBySquare](#app.map.getcoordinatebysquare)
- [app.map.load](#app.map.load)
- [app.map.maps](#app.map.maps)
- [app.map.moveCharacterOnSquare](#app.map.movecharacteronsquare)
- [app.map.registerSquareType](#app.map.registersquaretype)
- [app.map.squareSize](#app.map.squaresize)
- [app.map.squareTypes](#app.map.squaretypes)

#### List

##### **app.map.current** 
- Type: _object_
- Description:

Map currently loaded (or false if not defined yet).

##### **app.map.getCoordinateBySquare** 
- Type: _function_
- Description: 

Return coordniate associated with a map key. The returned value will be an object with the `x` and `y` coordinates of the center of the square:
```javascript
const { x, y } = app.map.getCoordinateBySquare('0|0')
```
 
##### **app.map.load**
- Type: _function_
- Description:

Load the map that needs to be used as the current map and set the inital position of the main character. If a map is already defined, it will be replaced:
```
app.map.load('map-name', map, '0|0')
```

##### **app.map.maps** 
- Type: _object_
- Description:

Contains all the maps that has been loaded.

##### **app.map.moveCharacterOnSquare** 
- Type: _function_
- Description:

Can be used to move any character to a given square:
```javascript
const character = app.characters.get('character-name')
app.map.moveCharacterOnSquare('0|-1', character)
```

#### **app.map.registerSquareType**
- Type: _function_
- Description:

Function used to register a new square type, see [associated guide](./pages/guides/register-square-types) for more information. 

##### **app.map.squareSize** 
- Type: _integer_
- Description:

`squareSize` used in the current app. The can only be defined during the `app` initialization.

##### **app.map.squareTypes** 
- Type: _array_
- Description:

Array of all the registered square types.
