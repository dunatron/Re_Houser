## Re-Houser(ToDo:Rename)

#### Mission

To provide a painless tenancy application/process that works quickly and effeciently. We believe there is no need for this process to be painful or.

#### Business Logic

ToDo

## Model

#### User

#### Tenant

####

## Querys

####

```js
query properties() {
  properties {
    id
    rooms
    rent
    moveInDate
    onTheMarket
    location
    locationLat
    locationLng
    owners {
      id
      email
    }
    images {
      url
    }
  }
}
```

## Mutations

#### createProperty

```js
mutation createProperty($data: PropertyCreateInput! $files:[Upload]) {
  createProperty(data:$data files:$files) {
    id
  }
}
// variables
{
  "data": {
    "rent": 45.65,
    "location": "A test location",
    "locationLat": 4512.0125,
    "locationLng": 125454,
    "rooms": 6,
    "owners": {
      "connect": {
        "id": "cjsy33qhd7aax0b35l0igfy64"
      }
    },
    "onTheMarket": false,
    "creator": {
      "connect": {
        "id": "cjsy33qhd7aax0b35l0igfy64"
      }
    },
    "images": {
      "create": {
        "filename": "Test file name",
        "mimetype": "MIMETYPE",
        "encoding": "encoding",
        "url": "test url"
      }
    }
  }
}
```

## NOTES

### testing

- ideal situation for an analysis of how well the system works is to have all dwellings in a mock database

## Deployment

#### backend

- when setting up a new cluster you need to manually run `prisma deploy` from the backend and setup the new service
