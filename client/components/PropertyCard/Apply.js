import React, { Component } from "react"
import { Mutation } from "react-apollo"
import { CREATE_RENTAL_APPLICATION } from "../../mutation/index"

export default class Apply extends Component {
  _apply = async createRentalApplication => {
    const res = await createRentalApplication()
    console.log("res => ", res)
  }
  render() {
    const { rentalApplications } = this.props.property
    return (
      <div>
        <Mutation
          mutation={CREATE_RENTAL_APPLICATION}
          variables={{
            data: {
              stage: "PENDING",
              property: {
                connect: {
                  id: "cjtffdu3zekqf0b516qinba8p",
                },
              },
              applicants: {
                connect: [
                  {
                    id: "cjtffbnqbekkm0b51mw4j128d",
                  },
                ],
              },
            },
          }}>
          {(createRentalApplication, { error, loading }) => (
            <div>
              <h1 onClick={() => this._apply(createRentalApplication)}>
                Apply component
              </h1>

              {rentalApplications &&
                rentalApplications.map((application, idx) => {
                  return (
                    <div>
                      {application.id}
                      {application.applicants &&
                        application.applicants.map((applicant, idx) => {
                          return (
                            <div>
                              <p> {applicant.id}</p>
                              <p>{applicant.firstName}</p>
                              <p> {applicant.lastName}</p>
                              <p>{applicant.email}</p>
                              <hr />
                            </div>
                          )
                        })}
                      <hr />
                    </div>
                  )
                })}
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}
