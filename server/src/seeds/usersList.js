const { CEO_DETAILS, CTO_DETAILS } = require("../const");

const userPassword = "test";

const userEmail3 = "bob@test.com";
const userEmail4 = "ted@test.com";
const userEmail5 = "ken@test.com";
const userEmail6 = "ben@test.com";
const userEmail7 = "lou@test.com";
const userEmail8 = "leo@test.com";
const userEmail9 = "lia@test.com";
const userEmail10 = "ida@test.com";
const userEmail11 = "lee@test.com";

const setWizardPermissions = {
  set: ["ADMIN", "USER", "PERMISSIONUPDATE", "WIZARD"]
};

const setAdminPermissions = {
  set: ["ADMIN", "USER"]
};

const setUserPermissions = {
  set: ["USER"]
};

const createAdminSettings = {
  create: {
    appraisalCreatedSub: true,
    propertyCreatedSub: true,
    rentalApplicationCreatedSub: true,
    leaseCreatedSub: true
  }
};

const userFrag = {
  email: userEmail3, // @unique String
  password: userPassword,
  acceptedSignupTerms: true,
  phone: "5555555",
  adminSettings: {
    create: {
      appraisalCreatedSub: false,
      propertyCreatedSub: false,
      rentalApplicationCreatedSub: false,
      leaseCreatedSub: false
    }
  },
  permissions: setUserPermissions
};

const adminFrag = {
  ...userFrag,
  adminSettings: {
    ...createAdminSettings
  },
  permissions: setAdminPermissions
};

const wizardFrag = {
  ...userFrag,
  adminSettings: {
    ...createAdminSettings
  },
  permissions: setWizardPermissions
};

const userList = [
  {
    ...userFrag,
    ...wizardFrag,
    id: CEO_DETAILS.id,
    email: "admin@rehouser.co.nz",
    firstName: "Heath R",
    lastName: "McDounough",
    phone: "5555555",
    permissions: setWizardPermissions
  },
  {
    ...userFrag,
    ...wizardFrag,
    id: CTO_DETAILS.id,
    email: "heathd@rehouser.co.nz",
    firstName: "Heath R",
    lastName: "Dunlop",
    phone: "0212439998",
    permissions: setWizardPermissions
  },
  {
    ...userFrag,
    ...wizardFrag,
    email: "grace@rehouser.co.nz",
    firstName: "Grace R",
    lastName: "McDounough",
    phone: "5555555",
    permissions: setAdminPermissions
  },
  {
    ...userFrag,
    email: userEmail3,
    firstName: "Bob",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail4,
    firstName: "Ted",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail5,
    firstName: "Ken",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail6,
    firstName: "Ben",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail7,
    firstName: "Lou",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail8,
    firstName: "Leo",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail9,
    firstName: "Lia",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail10,
    firstName: "Ida",
    lastName: "Tester",
    phone: "5555555"
  },
  {
    ...userFrag,
    email: userEmail11,
    firstName: "Lee",
    lastName: "Tester",
    phone: "5555555"
  }
];

const prodSeedList = [
  {
    ...wizardFrag,
    id: CEO_DETAILS.id,
    email: CEO_DETAILS.email,
    firstName: CEO_DETAILS.firstname,
    lastName: CEO_DETAILS.lastname,
    phone: CEO_DETAILS.phone,
    permissions: setWizardPermissions
  },
  {
    ...wizardFrag,
    id: CTO_DETAILS.id,
    email: CTO_DETAILS.email,
    firstName: CTO_DETAILS.firstname,
    lastName: CTO_DETAILS.lastname,
    phone: CTO_DETAILS.phone,
    permissions: setWizardPermissions
  },
  // {
  //   ...adminFrag,
  //   email: "siaujiun@gmail.com",
  //   firstName: "Siau Jiun",
  //   lastName: "Lim",
  //   permissions: setAdminPermissions
  // },
  {
    ...adminFrag,
    email: "anelsonmisa@gmail.com",
    firstName: "Adam",
    lastName: "Nelson-Misa",
    permissions: setAdminPermissions
  }
];

module.exports = process.env.STAGE === "dev" ? userList : prodSeedList;
