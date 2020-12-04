const _isRentalApplicant = (userId, applicants) => {
  const applicantUserIds = applicants
    ? applicants.map((applicant, idx) => applicant.user.id)
    : [];

  const isAnApplicant =
    applicantUserIds.length > 0 ? applicantUserIds.includes(userId) : false;
  return isAnApplicant;
};

export { _isRentalApplicant };
export default _isRentalApplicant;
