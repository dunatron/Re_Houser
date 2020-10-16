const userList = require("./usersList");
const imagesList = require("./imagesList");
const insulationStatementsList = require("./insulationStatementsList");
const moment = require("moment");
const { dollarsToCents } = require("../lib/dollarsToCents");

const propertyFrag = {
  id: "1", // @unique ID
  placeId: "ChIJz73Txq2tLqgRQhEoaEAZ06U", // @unique google placeId
  type: "HOUSE",
  headline: "A yes there was a headline for a property",
  rooms: 2,
  lowestRoomPrice: dollarsToCents(200),
  highestRoomPrice: dollarsToCents(400),
  useAdvancedRent: true,
  bathrooms: 1,
  garageSpaces: 1,
  carportSpaces: 1,
  offStreetSpaces: 1,
  rent: dollarsToCents(1000),
  moveInDate: moment()
    .subtract(1, "day")
    .format(),
  expiryDate: moment()
    .add(1, "year")
    .format(),
  onTheMarket: true,
  location: "5 Monowai Road, Ravensbourne, Dunedin",
  locationLat: -45.86423299999999,
  locationLng: 170.548709,
  titleType: "UNIT_TITLE",
  acceptedTerms: true,
  isLeased: false,
  lastLeaseId: "",
  // leaseExpiryDate: moment() // This is for ta lease that is attached... actually eww gross fucken burn it
  //   .add(1, "year")
  //   .format(),
  rehouserStamp: true,
  tenancyType: "FIXED",
  petsAllowed: true,
  maximumOccupants: 2,
  landlordProtectionCover: true,
  freeGlassCover: true,
  workingAlarms: true,
  inHallway3mOfEachBedroom: true,
  tenYearPhotoelectricAlarms: true,
  alarmsEachLevel: true,
  rehouserManaged: true,
  indoorFeatures: {
    set: ["FURNISHED"]
  },
  outdoorFeatures: {
    set: ["OUTDOOR_ENTERTAINMENT"]
  },
  heatSources: {
    set: ["ELECTRIC_HEATER", "HEAT_PUMP"]
  },
  pets: {
    set: ["FISH", "CAT"]
  },
  chattels: {
    set: ["DISH_WASHER", "HEAT_PUMP", "WALL_OVEN"]
  },
  accommodation: {},
  insulationForm: {
    create: {
      ...insulationStatementsList[0]
    }
  },
  creator: {
    connect: {
      email: userList[0].email
    }
  },
  owners: {
    connect: [
      {
        email: userList[0].email
      }
    ]
  },
  proofOfOwnership: {
    create: {
      ...imagesList[0]
    }
  },
  images: {
    create: [
      {
        ...imagesList[0]
      },
      {
        ...imagesList[1]
      },
      {
        ...imagesList[2]
      }
    ]
  },
  files: {
    create: {}
  },
  inspections: {
    create: [
      {
        date: moment()
          .add(2, "day")
          .format(),
        completed: false
      }
    ]
  }
};

// id: ID! @unique @id
//   updatedAt: DateTime! @updatedAt
//   createdAt: DateTime! @createdAt
//   property: Property @relation(name: "PropertyInspections")
//   lease: PropertyLease @relation(name: "LeaseInspections")
//   date: DateTime
//   completedTime: DateTime
//   completed: Boolean
//   notes: String
//   files: [File] @relation(name: "InspectionFiles", link: TABLE)

const propertiesList = [
  {
    ...propertyFrag,
    creator: {
      connect: {
        email: userList[1].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[1].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "2",
    placeId: "ChIJHwPz9TSKMW0RtTKdCiXIPSs", // @unique google placeId
    location: "28 Berry Street, Saint Albans, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.51756319999999,
    locationLng: 172.6305258,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        },
        {
          email: userList[1].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "3",
    placeId:
      "EkA4MyBDaHJpc3RjaHVyY2ggTm9ydGhlcm4gTW90b3J3YXksIEJlbGZhc3QsIEthaWFwb2ksIE5ldyBaZWFsYW5kIi4qLAoUChIJQW0l8PiRMW0RpzO2IJg0UQsSFAoSCSmFNqEzjDFtEeBfeYSG7wAF", // @unique google placeId
    location: "83 Christchurch Northern Motorway, Belfast, Kaiapoi",
    rent: dollarsToCents(1000),
    locationLat: -43.4258662,
    locationLng: 172.6475268,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "4",
    placeId: "ChIJAdRlwzKMMW0R9Feek8JcaFA", // @unique google placeId
    location: "875 Main North Road, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.439839,
    locationLng: 172.6356211,
    creator: {
      connect: {
        email: userList[1].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[1].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "5",
    placeId: "ChIJN0GiyjKMMW0RtcMWT7EpDVI", // @unique google placeId
    location: "885 Main North Road, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4390152,
    locationLng: 172.6361623,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "6",
    placeId: "ChIJZZyVhDCMMW0Rj91hyUp4Bd4", // @unique google placeId
    location: "32 Donegal Street, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4480434,
    locationLng: 172.6342515,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "7",
    placeId: "ChIJbZ406zCMMW0Rh03KC66W6K4", // @unique google placeId
    location: "17C Donegal Street, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.44716950000001,
    locationLng: 172.6337208,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  ,
  {
    ...propertyFrag,
    id: "8",
    placeId: "ChIJkeAC7VyMMW0RC6iBnsXuUVA", // @unique google placeId
    location: "11 Northwater Drive, Northwood, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4532091,
    locationLng: 172.6140598,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  ,
  {
    ...propertyFrag,
    id: "9",
    placeId:
      "EjExOCBKb2hucyBSb2FkLCBCZWxmYXN0LCBDaHJpc3RjaHVyY2gsIE5ldyBaZWFsYW5kIjASLgoUChIJrddNIEeMMW0Rka-XTIbvABMQEioUChIJezrZd5CMMW0RHfQXqhWuQPI", // @unique google placeId
    location: "18 Johns Road, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.45147069999999,
    locationLng: 172.624347,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  ,
  {
    ...propertyFrag,
    id: "10",
    placeId: "ChIJWdEh0ECMMW0RawFWxD0SoMM", // @unique google placeId
    location: "23 Lagan Street, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4531047,
    locationLng: 172.6246964,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  ,
  {
    ...propertyFrag,
    id: "11",
    placeId: "ChIJv-Dd8kCMMW0RGCAEvmbB2KA", // @unique google placeId
    location: "675B Main North Road, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4545481,
    locationLng: 172.6253043,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "12",
    placeId: "ChIJX7FYtT-MMW0RBuH8Y_Hvkiw", // @unique google placeId
    location: "6 Hossack Close, Belfast, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4564744,
    locationLng: 172.6293742,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "13",
    placeId: "ChIJ6bjMAIqLMW0R6Z14XIdPAOo", // @unique google placeId
    location: "33 Dunedin Street, Redwood, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4764352,
    locationLng: 172.6216652,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "14",
    placeId: "ChIJPS4-PHWMMW0RQUHKfJolT4w", // @unique google placeId
    location: "11 Clipper Place, Redwood, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.47503330000001,
    locationLng: 172.6256346,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "15",
    placeId: "ChIJw-hGGQuMMW0RLxZGW9UB-D0", // @unique google placeId
    location: "117 Prestons Road, Redwood, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.474025,
    locationLng: 172.6283523,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "16",
    placeId:
      "EjMxMyBBcG9sbG8gUGxhY2UsIFBhcGFudWksIENocmlzdGNodXJjaCwgTmV3IFplYWxhbmQiMBIuChQKEgkfUz3xmYsxbRGQPDpMhu8AExANKhQKEgkfUz3xmYsxbRFgy9aJT43DQw", // @unique google placeId
    location: "13 Apollo Place, Papanui, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4906198,
    locationLng: 172.6154603,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "17",
    placeId: "ChIJCYoj9pmLMW0RNbHJkGnQAfY", // @unique google placeId
    location: "7B Apollo Place, Papanui, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4902971,
    locationLng: 172.6150194,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "18",
    placeId: "ChIJj4imKAuLMW0ROvsTOUgxDpQ", // @unique google placeId
    location: "91 Harewood Road, Papanui, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4948076,
    locationLng: 172.6021312,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "19",
    placeId: "ChIJzSxWYZyLMW0RtlD8iHAIHyQ", // @unique google placeId
    location: "9 Nyoli Street, Northcote, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4877845,
    locationLng: 172.6094902,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "20",
    placeId: "ChIJeXNj-ZyLMW0RNPEBN9B_XJw", // @unique google placeId
    location: "14 Sawtell Place, Northcote, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4871575,
    locationLng: 172.6082758,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "21",
    placeId: "ChIJ5WICPJ2LMW0RlEUZ74rh4-0", // @unique google placeId
    location: "3 Phoenix Lane, Northcote, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.48587860000001,
    locationLng: 172.6068102,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "22",
    placeId: "ChIJeYlgGneLMW0RY0eto6IGsfY", // @unique google placeId
    location: "8 Honeysuckle Place, Northcote, Christchurch",
    rent: dollarsToCents(1000),
    locationLat: -43.4864799,
    locationLng: 172.6015597,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "23",
    placeId: "ChIJWcsoax-vOG0RKCb3UpSS7s0", // @unique google placeId
    location: "Honey Badger Saloon Featherston Street, Wellington",
    rent: dollarsToCents(1000),
    locationLat: -41.2826621,
    locationLng: 174.7775441,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "24",
    placeId: "ChIJgcIxN9SxOG0Rz6o_-TN-q1A", // @unique google placeId
    location: "29 Ascot Street, Thorndon, Wellington",
    rent: dollarsToCents(1000),
    locationLat: -41.278619,
    locationLng: 174.770189,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "25",
    placeId:
      "EjcyOSBKYXJtYW4gUm9hZCwgTW91bnQgV2VsbGluZ3RvbiwgQXVja2xhbmQsIE5ldyBaZWFsYW5kIjASLgoUChIJrXyj8GpJDW0RMMAWB2HvABMQHSoUChIJqVECl2pJDW0RchkDJLVqPA8", // @unique google placeId
    location: "29 Jarman Road, Mount Wellington, Auckland",
    rent: dollarsToCents(1000),
    locationLat: -36.9047587,
    locationLng: 174.8375263,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  },
  {
    ...propertyFrag,
    id: "26",
    placeId: "ChIJa4WaRxNJDW0RrOL-WZvO60A", // @unique google placeId
    location: "13 Boakes Road, Mount Wellington, Auckland",
    rent: dollarsToCents(1000),
    locationLat: -36.8999132,
    locationLng: 174.8351632,
    creator: {
      connect: {
        email: userList[0].email
      }
    },
    owners: {
      connect: [
        {
          email: userList[0].email
        }
      ]
    }
  }
];
module.exports = process.env.STAGE === "dev" ? propertiesList : [];
// module.exports = propertiesList;
