import React, { Component } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Error from "../ErrorMessage/index"
import { PropertiesTable } from "./styles"
import PropertyStripHeaders from "./headers"
import PropertyStrip from "./propertyStrip"
import SuperTable from "../SuperTable/index"
import Button from "@material-ui/core/Button"
import Modal from "../Modal/index"
import PropertyDetails from "../PropertyDetails/index"

const PROPERTIES_QUERY = gql`
  query PROPERTIES_QUERY {
    ownerProperties {
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
        firstName
      }
      images {
        url
      }
    }
  }
`

export default class index extends Component {
  state = {
    modalIsOpen: false,
    modalDetailsObj: {},
  }
  columnHeaders = () => {
    return [
      {
        id: "id",
        numeric: false,
        // disablePadding: true,
        label: "id",
        show: false,
        tableRenderKey: "th",
        found: "name",
        searchable: true,
      },
      {
        id: "location",
        numeric: false,
        // disablePadding: true,
        label: "location",
        show: true,
        tableRenderKey: "th",
        found: "location",
        searchable: true,
      },
      {
        id: "rent",
        numeric: false,
        // disablePadding: true,
        label: "rent",
        show: true,
        tableRenderKey: "th",
        found: "rent",
        searchable: true,
      },
      {
        id: "locationLng",
        numeric: false,
        // disablePadding: true,
        label: "locationLng",
        show: false,
        tableRenderKey: "th",
        found: "locationLng",
        searchable: true,
      },
      {
        id: "locationLat",
        numeric: false,
        // disablePadding: true,
        label: "locationLat",
        show: false,
        tableRenderKey: "th",
        found: "locationLat",
        searchable: true,
      },
      {
        id: "showDetails", //votes.id
        numeric: false,
        disablePadding: true,
        label: "View",
        show: true,
        type: "btnFunc",
        icon: (
          <Button color="primary" aria-label="Add to shopping cart">
            View
          </Button>
        ),
        funcName: "showDetails",
        found: "votes",
        tableRenderKey: "th",
      },
    ]
  }
  render() {
    return (
      <Query query={PROPERTIES_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          const { ownerProperties } = data
          const { modalIsOpen, modalDetailsObj } = this.state
          return (
            <>
              <Modal open={modalIsOpen} close={() => this.closeModal()}>
                {this.renderModalDetails()}
              </Modal>
              <SuperTable
                columnHeaders={this.columnHeaders()}
                tags={{
                  found: "tags",
                  key: "id",
                  options: [{ name: "one", value: "one" }],
                  // options: allTags
                  //   ? allTags.map(t => ({ name: t.name, value: t.id }))
                  //   : [],
                }}
                title="My Properties"
                data={ownerProperties}
                executeFunc={(funcName, obj) => {
                  this.executeFunctionByName(funcName, obj)
                }}
              />
            </>
          )
          // return (
          //   <PropertiesTable>
          //     <PropertyStripHeaders />
          //     {ownerProperties.map((property, i) => (
          //       <PropertyStrip key={i} property={property} />
          //     ))}
          //   </PropertiesTable>
          // )
        }}
      </Query>
    )
  }

  showDetails = dataObj => {
    this.openModal()
    this.setState({
      modalDetailsObj: dataObj,
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    })
  }

  renderModalDetails = updateQuery => {
    const { modalDetailsObj } = this.state
    // const { id, name, answers, links, notes, tags } = modalDetailsObj
    return <PropertyDetails />
  }

  executeFunctionByName = (functionName, dataObj /*, args */) => {
    switch (functionName) {
      case "showDetails":
        this.showDetails(dataObj)
        break
      default:
        alert("No function specified")
    }
  }
}
