import React, { Component } from "react"

const ApplicantDetails = ({ applicant }) => (
  <div>
    <h4>
      {applicant.user.firstName} {applicant.user.lastName}
    </h4>
    <ul>
      <li>{applicant.id}</li>
      <li>{applicant.approved}</li>
      <li>{applicant.user.firstName}</li>
      <li>{applicant.user.lastName}</li>
      <li>{applicant.user.email}</li>
      <li>{applicant.user.phone}</li>
      <button
        onClick={() =>
          alert("ToDo: create Modal that fetches user data and renders it")
        }>
        View More Details
      </button>
    </ul>
  </div>
)

export default ApplicantDetails
