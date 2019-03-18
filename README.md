## Re-Houser(ToDo:Rename)

## Mission

To provide a painless tenancy application/process that works quickly and effeciently. We believe there is no need for this process to be painful or.

## Features

- ToDo: Secure (Collects user data to enhance experience)
- ToDo: complete rental appraisal
  - Consider locations
  - Renovations
  - Age
  - Insulation
  - Number of bedrooms
  - Garages
    - space
  - Parking
  - Heating
  - Furnishings
    - Pre compiled list of selectable furnishings
    - Other
  - etc...
- ToDo: User rating system
  - some of these variables can be system calculated.
    - i.e landlords and response time can be calculated by gathering all response time data and calculating where they fit based on others and what these response times were
  - Tenants
    - Payments made on time
    - inspections submitted
  - Landlords
    - time it takes to respond through app
- ToDo: Inspections
  - Video
  - Photos
    - Required photos e.g. bathroom, kitchen,
    - auto delete after landlord has signed inspection off
- ToDO: Tenancy agreements auto poulate depending on the requirements dictated by the landlord
- ToDo: Tenancy agreements stored - anything on is reminded with notification in timely manner
- ToDo: Bont and rent payments come throught the platform - Submitted to landlor when required. Bond is submitted directly to the tenancy tribunal - connection is made with them to make platform interconnected
- ToDo: How do we list properties on other platforms - can it talk with tradme etc, Initially to market properties. Or do we aim to be completely independants

## Services

- Cloudinary
  - To store images and other files
  - seemless and decoupled architecture

## Business Logic

### Rental Appraisal

### Vacant Property

### Photos of house

### listing on multiple platforms

### Arrange viewings

### Hold viewings

### vetting potential tenants

### What makes a good tennat

### Signing contracts

### Taking bonds - Submit to tribunal

### Keys

### move In

### Inspections

### address breakdown in unplanned situations

## Tech

- React => For building the interface along with:
  - `Next.js` for server side rendering, routing and tooling
  - `StyledComponents` for styling
  - `React-Apollo` for interfacing with Apollo Client
  - `Material-UI` for theming and styling _(works well with styled components)_
- Apollo Client => For data management:
  - Perform GraphQL `Mutations`
  - Fetching GraphQL `Queries`
  - `Caching` GraphQL data
  - Managing `Local State`
  - `Error` and `Loading` UI states
  - _Note: Apollo client replaces the need for redux + data fetching/caching libraries_
- GraphQL Yoga => An express GraphQL Server for:
  - Implementing `Query` and `Mutation Resolvers`
  - Custom `Server Side Logic`
  - `Charging` credit cards
  - `Sending Email`
  - Performing `JWT Authentication`
  - Checking `Permissions`
- Prisma => A GraphQL database interface:
  - Provides a set of GraphQL `CRUD APIs` for MySQL or Postgres database
  - `Schema` Definition
  - Data `Relationships`
  - `Queried` directly from our Yoga server
  - `Self-hosted` or `as-a-service`

## Architecture - front-end

- \_app.js _(pages/\_app.js)_ - is the base document and essentially the entry point for our app:
  - It extends `next/App` and is rendered on ever page as the highest order component
  - It has a prop called `Component` which will render the current page we are on as its component. _(the name of the route is the page that will be rendered from the pages folder)_
  - This Component prop is wrapped in a `Page` component from the `components` folder and is where most of our theming wil take place
- \_document.js _(pages/\_document.js)_ - is our hook into `next/document`:
  - Is rendered on the server side
  - Is used to change the initial server side rendered document markup
  - Commonly used to implement server side rendering for css-in-js libraries
  - uses the ServerStyleSheet from styled components along with `next/document` to crawl our component and get any styles it needs for the page
  - _note: there is also an NoSsr tag found in the Page component to render the material theme server side_
- Page.js _(components/Page.js)_ - Is where we can do our theming and wraps every page:
  - entry point for theming such as `StyledComponents` and `Material-UI` setup
  - contains the Header.js component as we want to include it on every page
  - contains our `Meta.js` component to include all of the classic meta tags
  - uses the children prop to inherit and render the current page we are on.
- Header.js _(components/Header.js)_ - Our standard Header to be included on every page:
  - contains our `Nav.js` component
  - contains our search bar _(ToDo: update when we have entry component)_
  - contains our cart _(ToDo: update when we have entry component)_
  - contains nProgress UI and has the Router to render loading ui to the user
- Meta.js _(component/Meta.js)_ - Takes care of all the meta tags you would normally see in an html document:
  - contains `next/head` to update our document header and do side effects behind the scenes
  - title tag
  - any external css you may need to include
  - fb, twitter etc meta tags
  - loads in our `nProgress` css from the static folder
  - contains our viewport meta for responsive design
  - uses utf-8 for character encoding
  - loads in our favicon

## Global/InjectGlobal Css styles

- font-size is a base 10px on the html tag meaning when we do rem 1.5 it will be 15px i.e a multiple of base 10

## Component Tree

```JS
 <App>
  <Container>
    <Page>
      <Meta>
        <SideEffect(Head)>
          <Head />
        </SideEffect(Head)/>
      </Meta>
      <Header>
        <Nav>
      </Header>
      <NextPageComponent>
    </Page>
  </Container>
 </App>
```

## Architecture - Back-end

- index.js _(src/index.js)_ - This is the entry point for our application and serves as the following:
  - imports our `createServer.js` file and starts it
  - implements cors when starting server so that only our site and credentials can hit it
  - something else
- db.js _(src/db.js)_ - This file connects to the remote prisma DB and gives us the ability to query it with JS
- createServer.js _(src/createServer.js)_ - Creates our GraphQL Yoga server

  - Is an express server so can use other express middlewre
  - sits on top of apollo server
  - imports our resolvers _(Queries and Mutations)_ and sets them up with our server
  - _note: you would need to import everything graphql yoga does to get a working grahql server_

## Backend scripts

- e.g inside the backend directory run `yarn run deploy`

```json
"scripts": {
  "start": "nodemon -e js,graphql -x node src/index.js",
  "dev": "nodemon -e js,graphql -x node --inspect src/index.js",
  "test": "jest",
  "deploy": "prisma deploy --env-file variables.env"
}
```

## Frontend scripts

- e.g inside the frontend directory run `yarn run dev`

```json
"scripts": {
  "dev": "next -p 7777",
  "build": "next build",
  "start": "next start",
  "test": "NODE_ENV=test jest --watch",
  "heroku-postbuild": "next build"
}
```

## Prisma Setup.

- with the boiler plate navigate to the backend and install prisma globally `npm i -g prisma`
- Then run `prisma login` which will open up your browser _(You will want a prisma.io account)_
- Then run `prisma init` which will run you through a setup process on where you want to deploy your prisma server and will create 2 files for you:
  - `prisma.yml` - contains our server endpoint for setup, you will want to modify this file and create a `variables.env` file
  - `datamodel.graphql` -

###### prisma.yml

```yml
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.graphql
# secret is the database password, ommiting it in dev means easier development
# secret: ${env:PRISMA_SECRET}
hooks:
  post-deploy:
    - graphql get-schema -p prisma
```

###### variables.env

```.env
FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="https://us1.prisma.sh/heath-dunlop-37e897/the-trader/dev"
PRISMA_SECRET="MyDataBasePassword@$92"
APP_SECRET="jwtsecret123"
STRIPE_SECRET="sk_123youchanget his"
PORT=4444
```

## Deployment

1. Prisma DB
   1. inside the `backend` directory run `yarn run deploy-prod`
2. Yoga Service
   - Heroku
     - run `heroku apps:create trader-yoga-prod` which will create a git url and create a new remote
     - Our app is however is structered into two folders at the root git level "backend" and "frontend" so we need to add a remote
     - run `git remote add heroku-backend https://git.heroku.com/trader-yoga-prod.git`
     - push subtree `git subtree push --prefix backend heroku-backend master`
3. React/Next
   - Heroku
     - run `heroku apps:create trader-next-prod` which will create a git url and create a new remote
     - run `git remote add heroku-frontend https://git.heroku.com/trader-next-prod.git`
     - You would then need to build the assets `yarn run build` but because we dont commit our next build we are in a funny situation
     - SOLUTION add to package.json scripts `"heroku-postbuild": "next build"`
     - You also need to modify the `start` command in package.json scripts `"start": "next start -p $PORT"`
     - run `git subtree push --prefix frontend heroku-frontend master`

#### server

- when setting up a new cluster you need to manually run `prisma deploy` from the backend and setup the new service
- `git subtree push --prefix server heroku-backend master`

#### client

- `git subtree push --prefix client heroku-frontend master`

ToDo

# Model

## Querys

#### files

```js
query files {
  files {
    id
    filename
    url
    createdAt
  }
}
```

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

#### properties for logged ion user

```js
query properties {
  properties(where:{
    owners_some:{
      id: "cjtdzmemoa52x0b518kjp5jm8"
    }
  }) {
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
        "id": "cjszagrrzcnh90b357ezhvukl"
      }
    },
    "onTheMarket": false,
    "creator": {
      "connect": {
        "id": "cjszagrrzcnh90b357ezhvukl"
      }
    },
    "images":{
      "create":[
        {
        	"filename":"Test file name",
        	"mimetype":"MIMETYPE",
        	"encoding":"encoding",
        	"url":"test url"
        },
        {
        	"filename":"Test file name",
        	"mimetype":"MIMETYPE",
        	"encoding":"encoding",
        	"url":"test url"
      	}
      ],
      "connect": [
        {
          "id": "cjtdyd0t8a14l0b5138rl2grf"
        },
        {
          "id": "cjtdyd128a27j0b76dxmy3vml"
        }
      ]

    }
  }
}
```

#### bulk upload files

```js
mutation uploadFiles($files:[Upload!]!) {
  uploadFiles(files:$files) {
    id
    filename
  }
}
```

### testing

- ideal situation for an analysis of how well the system works is to have all dwellings in a mock database

## Notes on files

- If it where a self server
  - https://www.youtube.com/watch?v=bLQqkeVT7os
- deploying to heroukou use a external service such as cloudinary

# ToDo

## Rental Appraisal

## Vacant Property

## Photos of house

## listing on multiple platforms

## Arrange viewings

## Hold viewings

## vetting potential tenants

## What makes a good tennat

## Signing contracts

## Taking bonds - Submit to tribunal

## Keys

## move In

## Inspections

## address breakdown in unplanned situations
