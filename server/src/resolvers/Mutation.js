// mutations seperated into own file
const createRentalApplication = require("./mutations/createRentalApplication");
const createCreditCard = require("./mutations/createCreditCard");
const updateRentalApplication = require("./mutations/updateRentalApplication");
const completeRentalApplication = require("./mutations/completeRentalApplication");
const acceptRentalApplication = require("./mutations/acceptRentalApplication");
const createPropertyLease = require("./mutations/createPropertyLease");
const signLease = require("./mutations/signLease");
const createFriendRequest = require("./mutations/createFriendRequest");
const finalisePropertyLease = require("./mutations/finalisePropertyLease");
const acceptFriendRequest = require("./mutations/acceptFriendRequest");
const signup = require("./mutations/signup");
const signin = require("./mutations/signin");
const signout = require("./mutations/signout");
const deleteAccount = require("./mutations/deleteAccount");
const requestReset = require("./mutations/requestReset");
const resetPassword = require("./mutations/resetPassword");
const updateUser = require("./mutations/updateUser");
const updateRentalGroupApplicant = require("./mutations/updateRentalGroupApplicant");
const createPreRentalDocument = require("./mutations/createPreRentalDocument");
const applyToRentalGroup = require("./mutations/applyToRentalGroup");
const updateProperty = require("./mutations/updateProperty");
const createProperty = require("./mutations/createProperty");
const createFile = require("./mutations/createFile");
const deleteFile = require("./mutations/deleteFile");
const uploadFile = require("./mutations/uploadFile");
const uploadFiles = require("./mutations/uplodaFiles");
const renameFile = require("./mutations/renameFile");
const uploadPhotoId = require("./mutations/uploadPhotoId");
const uploadProfilePhoto = require("./mutations/uploadProfilePhoto");
const singleUpload = require("./mutations/singleUpload");
const updatePermissions = require("./mutations/updatePermissions");
const createChat = require("./mutations/createChat");
const createMessage = require("./mutations/createMessage");
const updatePropertyLease = require("./mutations/updatePropertyLease");
const updateInsulationForm = require("./mutations/updateInsulationForm");
const createPreTenancyForm = require("./mutations/createPreTenancyForm");
const createRentalAppraisal = require("./mutations/createRentalAppraisal");
const offerRentalAppraisal = require("./mutations/offerRentalAppraisal");
const uploadSignature = require("./mutations/uploadSignature");
const createPayment = require("./mutations/createPayment");
const updateWallet = require("./mutations/updateWallet");
const createViewing = require("./mutations/createViewing");
const updateViewing = require("./mutations/updateViewing");
const deleteViewing = require("./mutations/deleteViewing");
const confirmEmail = require("./mutations/confirmEmail");
const resendConfirmEmail = require("./mutations/resendConfirmEmail");
const createInspection = require("./mutations/createInspection");
const updateInspection = require("./mutations/updateInspection");
const createContactForm = require("./mutations/createContactForm");
const updatePropertyFiles = require("./mutations/updatePropertyFiles");
const updateRentalAppraisal = require("./mutations/updateRentalAppraisal");
const completeInspection = require("./mutations/completeInspection");
const inviteUser = require("./mutations/inviteUser");

// a collection of our business logic mutations
const mutations = {
  updatePermissions,
  singleUpload,
  uploadPhotoId,
  uploadProfilePhoto,
  createFile,
  uploadFile,
  uploadFiles,
  deleteFile,
  renameFile,
  createRentalApplication,
  updateRentalApplication,
  completeRentalApplication,
  acceptRentalApplication,
  createCreditCard,
  createPropertyLease,
  signLease,
  finalisePropertyLease,
  createFriendRequest,
  acceptFriendRequest,
  updateProperty,
  createProperty,
  signup,
  signin,
  confirmEmail,
  signout,
  deleteAccount,
  requestReset,
  resetPassword,
  updateUser,
  updateRentalGroupApplicant,
  createPreRentalDocument,
  applyToRentalGroup,
  createChat,
  createMessage,
  updatePropertyLease,
  updateInsulationForm,
  createPreTenancyForm,
  createRentalAppraisal,
  offerRentalAppraisal,
  uploadSignature,
  createPayment,
  updateWallet,
  createViewing,
  updateViewing,
  deleteViewing,
  resendConfirmEmail,
  createInspection,
  updateInspection,
  createContactForm,
  updatePropertyFiles,
  updateRentalAppraisal,
  completeInspection,
  inviteUser
};

module.exports = mutations;
