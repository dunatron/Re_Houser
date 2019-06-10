## Re-Houser(ToDo:Rename)//

- some e
  https://rehouser-production-cacaa3459e.herokuapp.com/rehouser/prod
  wss://rehouser-production-cacaa3459e.herokuapp.com/rehouser/prod

# Dev link

######

- http://test-frontend.rehouser.co.nz/

Our product runs in headless environments.

- server
-

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

- he so crazy look at the little baby
- you wil repect me
- and no matter how far i go you will need to reflect me

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

#### The Environments and their links

- DEV

  - https://app.prisma.io/heath-dunlop-37e897/services/prisma-us1/rehouser-service/dev
  - http:/localhost:4444 - we dont need to host it since we run it locally

- PROD

  - https://app.prisma.io/heath-dunlop-37e897/services/rehouser-production/rehouser-production/prod
  - https://app.prisma.io/heath-dunlop-37e897/servers/rehouser-production
  - https://rehouser-production-cacaa3459e.herokuapp.com/rehouser-production/prod

- HEROKU
  - https://dashboard.heroku.com/apps/rehouser-production-cacaa3459e
    - This is where the prisma server is hosted
  - https://dashboard.heroku.com/apps/rehouser-yoga-prod
    - this is where the yoga server is hosted
    - it is responsible for linking up the frontend and backend `FRONTEND_URL`, and `PRISMA_SECRET`etc will be found and configured in the settings
  - https://dashboard.heroku.com/apps/rehouser-next-prod
    - This is our front-end/next.js deployment

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

#### NEW HEROKU DEPLOYMENT

Notes:

- heroku has tight integration with Prisma and both are just fantastic
- Prisma has a nice gui to interface with your databases data

Step 1: Deploy Prisma

- using the GUI in prisma create a new server and fill in details:
  - serverName: rehouser-production
  - serverDescription: prod of rehouser
  - create a new db on heroku
  - create new server n heroku
  - Now we need to deploy. We have environment variables so...
    - We run this regular deploy command + a few flags
    - `prisma deploy --env-file variables.env -n`
      - Deploy to the existing server you created on prisma as the option
        - name: rehouser-prod
        - stage: prod
      - And the deployment of prisma shall be done
      - This will alter your pisma.yml file
        - Move these variables to a prod-variables.env file or something like that
        - Note dont forget the ws
          - http:
          - ws:

Step 2: Deploy Yoga/Business logic server(To heroku)

- Yoo need heroku
  - globally `brew install heroku/brew/heroku`
    - Note: this if for mac and versions may also differ. Brew is great. get brew
  - Now you want to be at the root of the app. i.e its folers would be
    - server
    - client
  - run `heroku apps:create rehouser-yoga-prod`
  - You will then get a new git remote e.g
    - https://git.heroku.com/rehouser-yoga-prod.git
  - run `git remote add heroku-backend {GIt repo for new heroku}`
    - git remote add prod-backend https://git.heroku.com/rehouser-yoga-prod.git
- run `git subtree push --prefix server prod-backend master`
  - Now let that deploy and it should be fine
  - ....

Step 3: Deploy front end/client

- heroku apps:create rehouser-next-prod
  - Yu will then get agit reote `https://git.heroku.com/rehouser-next-prod.git`
  - git remote add prod-frontend https://git.heroku.com/rehouser-next-prod.git

Step 4: add a real domain

- git subtree push --prefix server heroku-backend master

ToDo: More notes on deployments

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

#### rentalApplications

```js
query rentalApplications($where:RentalApplicationWhereInput!) {
  rentalApplications(where:$where) {
    id
    property {
      id
    }
  }
}
// variables
{
  "where": {
   "property": {
    	"id": "cjtftvcc8di8u0b768zue09z5"
  	}
  }
}
```

#### get user rental applications

```js
query myRentalApplications{
  rentalApplications(where:{
    applicants_some:{ id:""}
  }) {
    id
  }
}
query myRentalApplications{
  rentalApplications {
    id
    owner {
      id
      firstName
    }
    stage
    property {
      id
      location
      rent
      rooms
    }
    applicants {
      id
      preTenancyApplicationForm {
        id
        filename
        url
      }
    }
  }
}
```

#### properties with rental applications and user fragments

```js
fragment UserData on User {
  id
  firstName
  lastName
  phone
  email
  permissions
  photoIdentification {
    filename
    url
  }
  identificationNumber
  emergencyContactName
  emergencyContactNumber
  emergencyContactEmail
  referee1Name
  referee1Phone
  referee1Email
  referee2Name
  referee2Phone
  referee2Email
}

fragment RentalGroupApplicantData on RentalGroupApplicant {
  id
  email
  approved
  completed
  firstName
  email
  user {
    ...UserData
  }
}

fragment RentalApplications on RentalApplication {
  id
  visibility
  stage
  finalised
  applicants {
    ...RentalGroupApplicantData
  }
}

query OWNER_PROPERTIES_QUERY {
  properties {
    id
    rooms
    rent
    moveInDate
    onTheMarket
    location
    locationLat
    locationLng
    rentalApplications {
      ...RentalApplications
    }
    owners {
      id
      email
      firstName
    }
    images {
      url
    }
  }
}

```

#### get myPropertyLeases
on the serverSide I have set it up So you can simply call this query and you would  
recieve everything available to you.  
The server will only return things you are apart of and has the following injected into the where before it hits the database  

```js
query myLeases($where:PropertyLeaseWhereInput) {
  myLeases(where:$where) {
    id
  }
}
// there where (the below is always injected by the server)
{
  "where": {
    "id":"", 
    "OR": [
      {
        "owners_some":{
          "id":""
        }
      }, 
      {
        "tenants_some":{
          "id":""
        }
      }
    ]
  }
}
const where = {
      ...args.where,
      OR: [
        {
          owners_some: {
            id: ctx.request.userId,
          },
        },
        {
          tenants_some: {
            id: ctx.request.userId,
          },
        },
      ],
    }
{
  "where": {
    "OR": [
      {
        "lessors_some":{
          "user": {
            "id": "cjwq51kvcdy740b428jvm6phc"
          }
        }
      }, 
      {
        "lessees_some":{
          "user": {
            "id": "cjwq51kvcdy740b428jvm6phc"
          }
        }
      }
    ]
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
    "type":"HOUSE",
    "rent": 45.65,
    "carportSpaces":1,
    "garageSpaces": 5,
    "offStreetSpaces":2,
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
    },
    "outdoorFeatures":{
      "set":[
        "SWIMMING_POOL"
      ]
    },
    "indoorFeatures":{
      "set":[
       	"AIR_CONDITIONING",
				"FURNISHED",
				"INTERNAL_LAUNDRY"
      ]
    }
  }
}
```

#### updateProperty

```js
mutation UPDATE_PROPERTY_MUTATION(
  $id: ID!
  $data: PropertyUpdateInput!
) {
  updateProperty(data: $data, id: $id) {
    id
    rent
  }
}
// variables
{
  "id": "cju8wgaiqcjat0b99n5y4g8b8",
  "data": {
    "rent": 90
  }
}
```

#### createRentalApplication

```js
mutation createRentalApplication($data:RentalApplicationCreateInput!) {
  createRentalApplication(data:$data) {
    id
    stage
    members {
      id
      firstName
    }
    property {
      id
      location
    }
  }
}
// variables
{
  "data": {
    "stage":"PENDING",
    "property": {
      "connect": {
        "id": "${PropertyID}"
      }
    },
    "members": {
      "connect": [
        {
        	"id": "${UserID}"
      	}
      ]
    },
    "applicants":{
      "connect": []
    }
  }
}
```

#### applyToRentalGroup

```js
mutation applyToRentalGroup($data:RentalGroupApplicantCreateInput!) {
  createRentalGroupApplicant(data:$data) {
    id
    user {
      id
      firstName
      email
    }
    approved
    application {
      id
    }
  }
}
// variables
{
  "data": {
    "user": {
      "connect": {
        "id": "${UserID}"
      }
    },
    "approved": false,
    "application": {
      "connect": {
        "id": "${applicationID}"
      }
    }
  }
}
```

#### update rental application

```js
mutation UPDATE_RENTAL_APPLICATION($data: RentalApplicationUpdateInput! $where:RentalApplicationWhereUniqueInput!){
  updateRentalApplication(data: $data, where:$where) {
    id
    title
    stage
    visibility
  }
}
// variables
{
  "data": {
    "stage": "ACCEPTED",
    "visibility": "PRIVATE"
  },
  "where": {
    "id": ""
  }
}
```

#### complete rental application

```js
mutation COMPLETE_RENTAL_APPLICATION($applicationId: ID!) {
  completeRentalApplication(applicationId:$applicationId) {
    id
    stage
  }
}
// variables
{
  "applicationId": "sdfdsf"
}
```


#### updateUser

```js
mutation updateUser($data:UserUpdateInput! $photoFile:Upload) {
  updateUser(data:$data, photoFile:$photoFile) {
    id
    email
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
// variables
{
  "data": {
    "email": "heath.dunlop.hd@gmail.com"
  }
}
```

#### createCreditCard

- Create a credit card on the last serfver

```js
mutation createCreditCard($data:CreditCardCreateInput!){
  createCreditCard(data:$data) {
    id
    fingerprint
    last4
    name
    stripeCardId
    stripeCustmerId
    exp_month
    exp_year
  }
}
// caribales
```

- proceed to the nectLevel

```js

mutation createCreditCard($data:CreditCardCreateInput!){
  createCreditCard(data:$data) {
    id
    fingerprint
    last4
    name
    stripeCardId
    stripeCustmerId
    exp_month
    exp_year
  }
}
{
  "data": {
    "fingerprint":"",
    "last4":"",
    "name":"",
    "stripeCardId":"asadsdasd",
    "stripeCustmerId":"asasddasd",
    "exp_month": 3,
    "exp_year":2020,
    "cardOwner":{
      "connect":{
        "id":""
      }
    }
  }
}
```

### Subscriptions

- Rental application created subscription

```js
 subscription {
    rentalApplicationCreatedSub {
      node {
        id
        title
        stage
        visibility
      }
    }
  }
```

- Base Subscription example for rentalApplications

```js
subscription($where:RentalApplicationSubscriptionWhereInput) {
  rentalApplication(where:$where) {
    node {
      id
      title
      stage
    }
  }
}
// variables
{
  "where": {
    "mutation_in": "UPDATED",
    "node": {
      "stage": "PENDING"
    }
  }
}
// or
{
  "where": {
    "mutation_in": "UPDATED",
    "node": {
      "stage": "PENDING",
      "id": "asdads",
      "id_in": [
        "adas","asdasdads"
      ]
    }
  }
}
```

- subscribe to pending applications

```js
subscription($where:RentalApplicationSubscriptionWhereInput) {
  rentalApplicationUpdateSub(where:$where) {
    node {
      id
      title
      stage
    }
  }
}
//variables
{
  "where": {
    "mutation_in": "UPDATED",
    "node": {
      "stage": "PENDING",
      "id": "asdads",
      "id_in": [
        "adas","asdasdads"
      ]
    }
  }
}
```

### testing

- ideal situation for an analysis of how well the system works is to have all dwellings in a mock database

## Notes on files

- If it where a self server
  - https://www.youtube.com/watch?v=bLQqkeVT7os
- deploying to heroukou use a external service such as cloudinary

## Algolia Setup

# ToDo

1. Push Data

```js
const client = algoliasearch("4QW4S8SE3J", "••••••••••••••••••••••••••••••••");

const index = client.initIndex("demo_ecommerce");

fetch("https://alg.li/doc-ecommerce.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(products) {
    index.addObjects(products);
  });
```

2. set relevance

```js
const client = algoliasearch("4QW4S8SE3J", "••••••••••••••••••••••••••••••••");

const index = client.initIndex("demo_ecommerce");

index.setSettings({
  // Select the attributes you want to search in
  searchableAttributes: ["brand", "name", "categories", "description"],
  // Define business metrics for ranking and sorting
  customRanking: ["desc(popularity)"],
  // Set up some attributes to filter results on
  attributesForFaceting: [
    "categories",
    "searchable(brand)",
    "price",
    "outdoorFeatures",
    "indoorFeatures"
  ]
});
```

## apply for rental

- form
  - cover letter(message to landlord)
  - profile picture
  - Linkedin profile
  - Facebook page
  - Rent and lease details
    - preferred lease start date
    - earliest lease start date
    - preferred lease length in months
    - Weekly rent is \$650.00. Would you like to offer a higher or lower amount?
    - Personal Details
      - firstname
      - lastname
      - mobile
      - dob
      - gender

## Property

- beds/rooms
- bathrooms
- carpark
- furnished?
- OVERVIEW 2 Bed 1 Bath 1 Carpark Furnished
- Indoor features
  - Air conditioning
  - furnished
  - Internal Laundry
  - Dishwasher
  - built-in-wardrobes
  - Balcony
  - alarm system
  - heating
- Outdoor features
  - Outdoor spa
  - Outdoor entertainment
  - Swimming pool
- Lease
  - 12 months lease preffered
  - \$2600 Bond to be paid prior to movIn
  - available from friday, 27th december
  - Lease length and move in date can be discussed directly with Owner upon application. First rent payment is paid upon securing the property and deposited to the Owner on move in date.
- Send a message to the Owner
  - Tell the owner a little about yourself, why you love this place and any questions you have.

## Property Types

- House - Detached freestanding house. (no common walls or common areas)
- Apartment - Usually a unit within a large multi story apartment building. Can be any level within the building.
- Unit - Standard unit. If you're unsure if it's an apartment, villa or townhouse this should be your default choice.
- Townhouse - Typically 2 story unit with common grounds like an apartment or villa. May or may not have an adjoining wall to another townhouse.
- Villa - Typically single story as opposed to a Townhouse and is usually free standing without adjoining walls.
- Retirement living - A community designed for older adults (typically 55 years or older) who are generally able to care for themselves.
- Studio - A unit or apartment where the kitchen, bedroom and living space are combined.
- farm land - A house on a farm. Usually more than 10 acres with the lease incorporating some farm work.
- acreage Semi Rural - Usually less than 10 acres with a house on the property.
- Other

## Property Specifics

- Basics
  - Bedrooms - For a Studio leave it as one bedroom.
  - Bathrooms - A bathroom must have a bath or shower (a toilet on it's own is not considered a bathroom).
  - Garage spaces - Enclosed car spaces. Includes security parking.
  - Carport spaces - Open car spaces with a cover.
  - Off street spaces - Should be a proper space for a car that is not covered. Api for who owns these street parking spaces?
- Indoor features
  - Air conditioning
  - Furnished
  - Balcony
  - Dishwahser
  - Internal Laundry
    - An internal laundry as opposed to communal laundry facilities. This feature is typically used for units and apartments.
  - Alarm System
  - Build in Wardrobes
  - Heating
  - Fireplace
- Outdoor features
  - Fully fenced
  - Pet friendly
  - 420 friendly
  - Outdoor spa
  - Swimming pool
  - Outdoor entertainment
- Headline
  - Tips for a great headline
    - What’s the main attraction?
      - Think of one key feature that tenants are going to love about your property. Open plan? Large backyard? Close to transport? Renovated?
    - Under 6 words
      - A catchy and memorable phrase that captures their attention. e.g. "Wubbalubbadubdub", "And that's the wayyyyyy the news goes!"
        - AIDS!
        - And that's why I always say, 'Shumshumschilpiddydah!
        - GRASSSSS... tastes bad
    - Don't repeat what they already know
      - They can already see the suburb, number of bedrooms and type of property so don't say ‘4 bedroom house'.
    - Headline Examples
      - North-facing and newly renovated
      - Transport and amenities at your door
      - Extra spacious open plan living
    - Bullet points vs Paragraph of text
      - Both work great together. Paragraphs help set the scene and build emotion. While bullet points are a great way to list specific features your potential tenants can check off.
      - 100 words is enough
        - Not a hard fast rule. You want to provide just enough information to make it worth an inspection.
      - Call to action
        - Give them a reason to take action. Here's an example: This house has always leased in a few days so get in quick before it's gone.
- Description
- Photos
- Floorplans
- Protection - helps you get setup with the right insurances and compliance. Select the protection you are interested in finding out more about.
  - Landlord Insurance
  - Building Insurance
  - Smoke alarm compliance
    - {COMPANY_NAME} can help owners get and keep smoke alarm compliant without lifting a finger that may save your tenants life.
  - Keep your home pest free
    - The easiest way to avoid dealing with pest issues is to be proactive. Get a pre tenant inspection done and you will find the majority of pest issues become a tenant responsibility. (except possums, termites, bees etc). You will be advised if any treatment is required.
  - Home Emergency Policy
    - Get covered for a range of Home Emergency call outs 24-7, 365 days/year. It's like roadside assistance, except for your home. Plans to suit different budgets offering between 2-8 call-outs per year, up to \$300 toward each call-out.

MONEY STUFF

- Weekly Rent amount (300)
  - LOL at cubi calulations/math
  - 300 \* 52 = 15600
  - 1200 \* 12
  - Pr5obs more going on here than my initial lol
  - obviously reserach this heavily
- Frequency of rent payments
  - weekly (\$300.00)
  - fortnighlty (\$600.00)
  - Four weekly (\$1200.00)
  - Monthly (\$1303.57)

Frequency of rent payments HELP

- What does this mean?
  - How often rent is paid. Your property will be advertised at the weekly rent regardless of which option you choose.
- What is normal?
  - Fortnightly. This is also the maximum allowed in NSW.
- Can this be changed?
  - Yes, anytime. You can change this when you secure your new tenant.
- What is a bond?
  - Money paid by the tenant before they move in and held by the bond authority. After the tenant moves out you can claim money from the bond if money is owing (for cleaning, rent, or damages etc).
- How much can I charge?
  - The standard is 4 weeks' rent in NSW. This is also the maximum amount you can charge regardless of the situation (pets, furnished or you increase the rent).
- Can I change this later?
  - Yes. In fact we recommend leaving the bond amount as per default for now. The bond can be changed anytime up until the lease is signed.
- What's my place worth?
  - Renters determine value by comparing each property on the market for rent. So you should do the same. If you have a few weeks before the property is vacant you might set the rent the same or a little higher (and vice versa).
- Can I change it later?
  - Yes, you can change the rent amount at anytime while advertising. You can also accept any price (higher or lower) than your listed price.
- What if I price it too low?
  - You will probably get offers to pay a higher rent. If you have more than 3 quality potential tenants wanting to rent your property (without higher offers) at once you could ask if they would like to offer more.
- What if I price it too high?
  - You should still get some enquiries but from people who are desperate. You're much better off waiting a week for a quality tenant.
- IMPORTANT: what date is your property available for someone to move in
  - My tenants are still in the property
    - We recommend leaving at least 2 days between the move out date and available date so the condition report and any left over cleaning or repairs can be done.
  - What if I don't know yet?
    - Be conservative and give yourself a buffer. In the description you could mention a ‘Potentially earlier move in date' but set realistic expectations here.
  - What if the date is in the past?
    - pfft give me some respect... It will show as ‘Available Now'.
  - How long would you like the initial lease to be?
    - default 12 months(recommended)
    - What does this mean?
      - Think of it like a contract period. You can keep renewing the lease (contract period) as many times as you like. Don't mistake this with how long you want the tenants to be in your property.
    - Can I change this?
      - Yes, anytime, except after you've signed the lease! You can change this when you secure your new tenant.
    - What's normal?
      - 12 months but don't let that stop you. If you're after long term tenants feel free to put down 24 months (or even longer). There is no minimum. The maximum is 5 years. Some areas allow longer leases so talk to us for specific advice on this.
    - Where is this displayed?
      - TRON QUESTION: why is this the case? seems annoying and like a click bait to me. remove it shouldnt be part of our reasoning or thinking. i.e show it always
      - Only when the tenant requests to rent your property. It is not listed on your advertisement.
    - What happens when the lease is over?
      - It automatically rolls over to a month to month lease until one of you give notice. We'll ask if you want to renew the lease well and truly before this anyway.

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

###### FInal Notes

- Sticking to the script,
- while yall have been skipping scenes

###### LEARNING RESOURCES

- [React Hooks Crash Course](https://www.youtube.com/watch?v=-MlNBTSg_Ww)
- [Connect & extend Algolia components](https://glitch.com/edit/#!/react-instantsearch-material-ui?path=src/App.js:360:1)

## TODO

This is getting to bl;oated. Exzport queries, Frags, muattions and all that shit to docs fol;der/queries etc

- UserData

```js
fragment UserData on User {
  id
  firstName
  lastName
  phone
  email
  permissions
  photoIdentification {
    filename
    url
  }
  identificationNumber
  emergencyContactName
  emergencyContactNumber
  emergencyContactEmail
  referee1Name
  referee1Phone
  referee1Email
  referee2Name
  referee2Phone
  referee2Email
}

fragment RentalGroupApplicantData on RentalGroupApplicant {
  id
  email
  approved
  completed
  firstName
  email
  user {
    ...UserData
  }
}

fragment RentalApplications on RentalApplication {
  id
  visibility
  stage
  finalised
  applicants {
    ...RentalGroupApplicantData
  }
}

query OWNER_PROPERTIES_QUERY {
  properties {
    id
    rooms
    rent
    moveInDate
    onTheMarket
    location
    locationLat
    locationLng
    rentalApplications {
      ...RentalApplications
    }
    owners {
      id
      email
      firstName
    }
    images {
      url
    }
  }
}

```

- Upload Photo ID

```js
mutation UPLOAD_PHOTO_IDENTIFICATION($file:Upload!, $photoId:String!){
  uploadPhotoId(file: $file, photoId:$photoId) {
    identificationNumber
    photoIdentification {
      id
      filename
      url
    }
  }
}
```
