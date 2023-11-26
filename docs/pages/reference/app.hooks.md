## Reference

### app.hooks

#### Overview

- [app.hooks.addAction](#app.hooks.addaction)
- [app.hooks.doAction](#app.hooks.doaction)
- [app.hooks.addFilter](#app.hooks.addfilter)
- [app.hooks.applyFilters](#app.hooks.applyfilters)
- [app.hooks.removeAction](#app.hooks.removeaction)
- [app.hooks.removeFilter](#app.hooks.removefilter)

#### List

##### **app.hooks.addAction**
- Type: _function_
- Description: 

Adds a new action callback to a specified hook.

```javascript
app.hooks.addAction('hookName', args => {
  // Your action logic here
})
```

##### **app.hooks.doAction**
- Type: _function_
- Description: 

Triggers all registered action callbacks for a given hook.

```javascript
app.hooks.doAction('hookName', { /* args */ })
```

##### **app.hooks.addFilter**
- Type: _function_
- Description: 

Adds a new filter callback to a specified hook.

```javascript
pp.hooks.addFilter('hookName', value => {
  // Your filter logic here
  return modifiedValue
})
```

##### **app.hooks.applyFilters**
- Type: _function_
- Description: 

Applies all registered filter callbacks for a given hook to an initial value.

```javascript
const modifiedValue = app.hooks.applyFilters('hookName', initialValue)
```

##### **app.hooks.removeAction**
- Type: _function_
- Description: 

Removes a specific action callback from a hook.

```javascript
app.hooks.removeAction('hookName', callbackToRemove)
```

##### **app.hooks.removeFilter**
- Type: _function_
- Description: 

Removes a specific filter callback from a hook.

```javascript
app.hooks.removeFilter('hookName', filterToRemove)
```
