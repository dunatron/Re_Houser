# Super Table Documentation

## Types

- `btnFunc` will render a button that when clicked will return the name of the function you want to execute and the object/row
- `numberOfObj` will go deep to find the number of objects at a certainm key
- `deep`
- `map`
- `tag`
- `checkbox`
- `truthly`

```js
[
  {
    id: 'location',
    numeric: false,
    // disablePadding: true,
    label: 'location',
    show: true,
    tableRenderKey: 'th',
    found: 'location',
    searchable: true,
    tableRenderProps: {
      size: 'medium',
      style: {
        minWidth: '220px',
      },
    },
  },
  {
    id: 'showDetails', //votes.id
    numeric: false,
    disablePadding: false,
    label: 'View',
    show: true,
    type: 'btnFunc',
    icon: (
      <Button color="primary" aria-label="Add to shopping cart">
        View
      </Button>
    ),
    funcName: 'showDetails',
    found: 'votes',
    tableRenderKey: 'th',
  },
  {
    id: 'propertyLocation',
    numeric: false,
    // disablePadding: true,
    label: 'Property name',
    show: true,
    tableRenderKey: 'th',
    type: 'deep',
    found: 'property.location',
    searchable: true,
    tableRenderProps: {
      size: 'medium',
      style: {
        minWidth: '220px',
      },
    },
  },
];
```
