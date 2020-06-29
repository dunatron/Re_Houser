const userPassword = "test";

const userEmail1 = "heath.dunlop.hd@gmail.com";
const userEmail2 = "heathd@rehouser.co.nz";
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
  set: ["ADMIN", "USER", "PERMISSIONUPDATE"]
};

const setAdminPermissions = {
  set: ["ADMIN", "USER"]
};

const setUserPermissions = {
  set: ["USER"]
};

const userFrag = {
  email: userEmail1,
  password: userPassword,
  firstName: "Heath",
  lastName: "Dunlop",
  phone: "0212439998",
  // profilePhoto: File
  identificationNumber: "DH812768",
  emergencyContactName: "Jon Doe",
  emergencyContactNumber: "55555555",
  emergencyContactEmail: "jondoe@test.com",
  referee1Name: "Swain",
  referee1Phone: "1233333",
  referee1Email: "swain@test.com",
  referee2Name: "Garen",
  referee2Phone: "6799000",
  referee2Email: "garen@test.com",
  // primaryCreditCard: CreditCard
  // friends: [User!]!
  // friendRequests: [FriendRequest!]!
  // awaitingFriends: [FriendRequest!]!
  // chats: [Chat!]!
  // permissions: setUserPermissions,
  // token: String
  // rehouserStamp: Boolean
  // signature: File
  // activity: [Activity!]!
  // involvedActivity: [Activity!]!
  // rentalAppraisals: [RentalAppraisal]
  // usedFreeAppraisal: Boolean
  // physicalAddress: String
  // proofOfAddress: File
  acceptedSignupTerms: true,
  adminSettings: {
    create: {}
  }
};

const userList = [
  {
    ...userFrag,
    email: "heath.dunlop.hd@gmail.com",
    firstName: "Heath",
    lastName: "Dunlop",
    permissions: setWizardPermissions
  },
  {
    ...userFrag,
    email: "heathd@rehouser.co.nz",
    firstName: "Heath R",
    lastName: "Dunlop",
    permissions: setUserPermissions
  },
  {
    ...userFrag,
    email: "siaujiun@gmail.com",
    firstName: "Siau Jiun",
    lastName: "Lim",
    permissions: setAdminPermissions
  },
  {
    ...userFrag,
    email: "admin@rehouser.co.nz",
    firstName: "Heath R",
    lastName: "McDounough",
    phone: "5555555",
    permissions: setAdminPermissions
  },
  {
    ...userFrag,
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

module.exports = userList;
