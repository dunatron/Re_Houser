const userList = require("./usersList");
const imagesList = require("./imagesList");
const insulationStatementsList = require("./insulationStatementsList");
const moment = require("moment");

const propertyFrag = {
  id: "1",
  type: "HOUSE",
  headline: "A yes there was a headline for a property",
  rooms: 2,
  lowestRoomPrice: 17000,
  highestRoomPrice: 19000,
  useAdvancedRent: true,
  bathrooms: 1,
  garageSpaces: 1,
  carportSpaces: 1,
  offStreetSpaces: 1,
  rent: 25000,
  moveInDate: moment()
    .subtract(1, "day")
    .format(),
  expiryDate: moment()
    .add(1, "year")
    .format(),
  onTheMarket: true,
  location: "5 Monowai Road, Ravensbourne, Dunedin",
  locationLat: -45.8642292,
  locationLng: 170.546515,
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
  indoorFeatures: {
    set: ["AIR_CONDITIONING", "BUILT_IN_WARDROBES", "DISHWASHER"]
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
  images: {
    connect: [
      {
        id: imagesList[0].id
      },
      {
        id: imagesList[1].id
      },
      {
        id: imagesList[2].id
      }
    ]
  }
};

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
    location: "28 Berry Street, Saint Albans, Christchurch",
    rent: 30000,
    locationLat: -43.5174465,
    locationLng: 172.6299702,
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
    location: "83 Christchurch Northern Motorway, Belfast, Kaiapoi",
    rent: 17000,
    locationLat: -43.4258623,
    locationLng: 172.6453328,
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
    location: "875 Main North Road, Belfast, Christchurch",
    rent: 32000,
    locationLat: -43.4398577,
    locationLng: 172.6349235,
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
    location: "885 Main North Road, Belfast, Christchurch",
    rent: 64000,
    locationLat: -43.439014,
    locationLng: 172.6354636,
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
    location: "32 Donegal Street, Belfast, Christchurch",
    rent: 27300,
    locationLat: -43.4480419,
    locationLng: 172.6333988,
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
    location: "17C Donegal Street, Belfast, Christchurch",
    rent: 29300,
    locationLat: -43.4471685,
    locationLng: 172.6331559,
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
    location: "11 Northwater Drive, Northwood, Christchurch",
    rent: 21100,
    locationLat: -43.453208,
    locationLng: 172.613434,
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
    location: "18 Johns Road, Belfast, Christchurch",
    rent: 47300,
    locationLat: -43.4514668,
    locationLng: 172.622153,
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
    location: "23 Lagan Street, Belfast, Christchurch",
    rent: 24300,
    locationLat: -43.4531034,
    locationLng: 172.6239823,
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
    location: "675B Main North Road, Belfast, Christchurch",
    rent: 64300,
    locationLat: -43.4545461,
    locationLng: 172.6242073,
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
    location: "6 Hossack Close, Belfast, Christchurch",
    rent: 13300,
    locationLat: -43.4564734,
    locationLng: 172.628811,
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
    location: "33 Dunedin Street, Redwood, Christchurch",
    rent: 64300,
    locationLat: -43.4764339,
    locationLng: 172.6209375,
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
    location: "11 Clipper Place, Redwood, Christchurch",
    rent: 89300,
    locationLat: -43.4750323,
    locationLng: 172.6250861,
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
    location: "117 Prestons Road, Redwood, Christchurch",
    rent: 55300,
    locationLat: -43.474024,
    locationLng: 172.6278038,
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
    location: "13 Apollo Place, Papanui, Christchurch",
    rent: 44300,
    locationLat: -43.4905719,
    locationLng: 172.6148605,
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
    location: "7B Apollo Place, Papanui, Christchurch",
    rent: 55300,
    locationLat: -43.4902961,
    locationLng: 172.6144709,
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
    location: "91 Harewood Road, Papanui, Christchurch",
    rent: 11300,
    locationLat: -43.4948845,
    locationLng: 172.6017934,
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
    location: "9 Nyoli Street, Northcote, Christchurch",
    rent: 69300,
    locationLat: -43.4877835,
    locationLng: 172.6089417,
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
    location: "14 Sawtell Place, Northcote, Christchurch",
    rent: 69420,
    locationLat: -43.4871565,
    locationLng: 172.6077273,
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
    location: "3 Phoenix Lane, Northcote, Christchurch",
    rent: 17800,
    locationLat: -43.4858776,
    locationLng: 172.6062617,
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
    location: "8 Honeysuckle Place, Northcote, Christchurch",
    rent: 66800,
    locationLat: -43.4864789,
    locationLng: 172.6010112,
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
    location: "Honey Badger Saloon Featherston Street, Wellington",
    rent: 72800,
    locationLat: -41.282658,
    locationLng: 174.7753501,
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
    location: "29 Ascot Street, Thorndon, Wellington",
    rent: 31800,
    locationLat: -41.278618,
    locationLng: 174.7696405,
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
    location: "29 Jarman Road, Mount Wellington, Auckland",
    rent: 53200,
    locationLat: -36.9047428,
    locationLng: 174.8357396,
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
    location: "13 Boakes Road, Mount Wellington, Auckland",
    rent: 32800,
    locationLat: -36.8999121,
    locationLng: 174.834607,
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

module.exports = propertiesList;
