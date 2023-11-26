## Hooks

### Filters

More information about how to interact with filters in the [app.hooks reference page](./pages/reference/app.hooks.md).

#### Overview

- [loadRessourceURL](#loadressourceurl)

#### List

##### **loadRessourceURL**

Modify 3D ressource URL before fetching it:
```javascript
app.hooks.applyFilters('loadRessourceURL', url => {
  // ...
  return url
})
```
