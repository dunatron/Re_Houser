import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import PropTypes from "prop-types"

import SuperTable from "../SuperTable/index"
import Button from "@material-ui/core/Button"
import Modal from "../Modal/index"
import PropertyDetails from "../PropertyDetails/index"
import Router from "next/router"

const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const manageApplicationForCurrentUser = (dataObj, me) => {
  console.log("I THINK YOU NEED MORE IN YOUR DATAOBJECT =>  ", dataObj)
  const { applicants, owner, id, property, stage } = dataObj
  // Lol i told you. the rougiue name of lease maager. ... ffs
  // if (me.id === owner.id) handleLink("/my/application", { me: me })
  // tripping, no below /my/applictaio0n existss. was thinking to use lases.js for an owneer.. 
  //if (me.id === owner.id) return handleLink("/my/application", { leaseId: id })
}

const columnHeaders = () => {
  return [
    {
      id: "id",
      numeric: false,
      // disablePadding: true,
      label: "id",
      show: true,
      tableRenderKey: "th",
      found: "id",
      searchable: true,
      tableRenderProps: {
        size: "medium",
        style: {
          minWidth: "220px",
        },
      },
    },
    {
      id: "stage",
      numeric: false,
      // disablePadding: true,
      label: "stage",
      show: true,
      tableRenderKey: "th",
      found: "stage",
      searchable: true,
      tableRenderProps: {
        size: "medium",
        style: {
          minWidth: "220px",
        },
      },
    },
    {
      id: "propertyLocation",
      numeric: false,
      // disablePadding: true,
      label: "Property name",
      show: true,
      tableRenderKey: "th",
      type: "deep",
      found: "property.location",
      searchable: true,
      tableRenderProps: {
        size: "medium",
        style: {
          minWidth: "220px",
        },
      },
    },
    {
      id: "manage", //votes.id
      numeric: false,
      disablePadding: false,
      label: "Manage",
      show: true,
      type: "btnFunc",
      icon: (
        <Button color="primary" aria-label="Add to shopping cart">
          Manage
        </Button>
      ),
      funcName: "manageApplication",
      tableRenderKey: "th",
    },
  ]
}

const RentalApplicationsTable = props => {
  const { myRentalApplications, me } = props
  console.log("myRentalApplications => ", myRentalApplications)
  console.log("thats cooll but do I haveme? => ", props)
  const showDetails = () => alert("wake up and smell the garden")
  const executeFunctionByName = (functionName, dataObj /*, args */) => {
    switch (functionName) {
      case "manageApplication":
        return manageApplicationForCurrentUser(dataObj, me)
      default:
        alert("No function specified")
    }
  }
  return (
    <div>
      <h1>Running around like indians but dam not one of em a chief</h1>
      <SuperTable
        columnHeaders={columnHeaders()}
        orderBy="id"
        title="My Applications"
        data={myRentalApplications}
        executeFunc={async (funcName, obj) =>
          executeFunctionByName(funcName, obj)
        }
      />
    </div>
  )
}

// PropTypes
RentalApplicationsTable.propTypes = {
  // me: yea not adding me to PropTypes find it somewhere else
  myRentalApplications: PropTypes.arrayOf(
    PropTypes.shape({
      applicants: PropTypes.arrayOf(
        PropTypes.shape({
          approved: PropTypes.string,
          completed: PropTypes.string,
          id: PropTypes.sting,
          __typename: PropTypes.string,
        })
      ),
      id: PropTypes.string,
      owner: PropTypes.shape({
        firsName: PropTypes.string,
        id: PropTypes.string,
      }),
      property: PropTypes.shape({
        id: PropTypes.string,
        location: PropTypes.string,
        rent: PropTypes.string,
        rooms: PropTypes.string,
        __typename: PropTypes.string,
      }),
      stage: PropTypes.string,
      __typename: PropTypes.string,
    })
  ),
}

export default RentalApplicationsTable
