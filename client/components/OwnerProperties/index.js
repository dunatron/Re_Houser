// import React, { Component } from "react"
// import gql from "graphql-tag"
// import { Query, Mutation } from "react-apollo"
// import Error from "../ErrorMessage/index"
// import SuperTable from "../SuperTable/index"
// import Button from "@material-ui/core/Button"
// import Modal from "../Modal/index"
// import PropertyDetails from "../PropertyDetails/index"
// import { ToastContainer, toast } from "react-toastify"
// import Router from "next/router"
// import { graphql, compose, withApollo } from "react-apollo"
// import { PROPERTIES_QUERY } from "../../query/index"
// const handleLink = (route = "/", query = {}) => {
//   Router.push({
//     pathname: route,
//     query: query,
//   })
// }

// const OWNER_PROPERTIES_QUERY = gql`
//   query OWNER_PROPERTIES_QUERY {
//     ownerProperties {
//       id
//       rooms
//       rent
//       moveInDate
//       expiryDate
//       onTheMarket
//       location
//       locationLat
//       locationLng
//       owners {
//         id
//         email
//         firstName
//       }
//       images {
//         url
//       }
//       isLeased
//     }
//   }
// `

// const UPDATE_PROPERTY_MUTATION = gql`
//   mutation UPDATE_PROPERTY_MUTATION($id: ID!, $data: PropertyUpdateInput!) {
//     updateProperty(id: $id, data: $data) {
//       id
//       onTheMarket
//       location
//     }
//   }
// `

// class OwnerProperties extends Component {
//   state = {
//     modalIsOpen: false,
//     modalDetailsObj: {},
//   }
//   columnHeaders = () => {
//     return [
//       {
//         id: "location",
//         numeric: false,
//         // disablePadding: true,
//         label: "location",
//         show: true,
//         tableRenderKey: "th",
//         found: "location",
//         searchable: true,
//         tableRenderProps: {
//           size: "medium",
//           style: {
//             minWidth: "220px",
//           },
//         },
//       },
//       {
//         id: "id",
//         numeric: false,
//         // disablePadding: true,
//         label: "id",
//         show: false,
//         tableRenderKey: "th",
//         found: "name",
//         searchable: true,
//       },
//       {
//         id: "onTheMarket",
//         numeric: false,
//         type: "checkbox",
//         // disablePadding: true,
//         label: "onTheMarket",
//         show: true,
//         tableRenderKey: "th",
//         found: "onTheMarket",
//         funcName: "toggleOnTheMarket",
//         searchable: true,
//       },
//       {
//         id: "isLeased",
//         numeric: false,
//         type: "truthly",
//         // disablePadding: true,
//         label: "isLeased",
//         show: true,
//         tableRenderKey: "th",
//         found: "isLeased",
//       },
//       {
//         id: "moveInDate",
//         numeric: false,
//         // type: "checkbox",
//         // disablePadding: true,
//         label: "moveInDate",
//         show: true,
//         tableRenderKey: "th",
//         found: "moveInDate",
//         searchable: true,
//       },
//       {
//         id: "expiryDate",
//         numeric: false,
//         // type: "checkbox",
//         // disablePadding: true,
//         label: "expiryDate",
//         show: true,
//         tableRenderKey: "th",
//         found: "expiryDate",
//         searchable: true,
//       },

//       {
//         id: "rent",
//         numeric: false,
//         // disablePadding: true,
//         label: "rent",
//         show: true,
//         tableRenderKey: "th",
//         found: "rent",
//         searchable: true,
//       },
//       {
//         id: "locationLng",
//         numeric: false,
//         // disablePadding: true,
//         label: "locationLng",
//         show: false,
//         tableRenderKey: "th",
//         found: "locationLng",
//         searchable: true,
//       },
//       {
//         id: "locationLat",
//         numeric: false,
//         // disablePadding: true,
//         label: "locationLat",
//         show: false,
//         tableRenderKey: "th",
//         found: "locationLat",
//         searchable: true,
//       },
//       {
//         id: "showDetails", //votes.id
//         numeric: false,
//         disablePadding: false,
//         label: "View",
//         show: true,
//         type: "btnFunc",
//         icon: (
//           <Button color="primary" aria-label="Add to shopping cart">
//             View
//           </Button>
//         ),
//         funcName: "showDetails",
//         found: "votes",
//         tableRenderKey: "th",
//       },
//       {
//         id: "manage", //votes.id
//         numeric: false,
//         disablePadding: false,
//         label: "Manage",
//         show: true,
//         type: "btnFunc",
//         icon: (
//           <Button color="primary" aria-label="Add to shopping cart">
//             Manage
//           </Button>
//         ),
//         funcName: "manageProperty",
//         tableRenderKey: "th",
//       },
//     ]
//   }

//   _OptimisticResponse = () => {
//     if (!this.state.updateData) return undefined
//     return {
//       __typename: "Mutation",
//       updateProperty: {
//         __typename: "Property",
//         id: this.state.updateData.id,
//         onTheMarket: !this.state.updateData.onTheMarket,
//       },
//     }
//   }

//   render() {
//     return (
//       <Query query={OWNER_PROPERTIES_QUERY}>
//         {({ data, loading, error }) => {
//           if (error) return <Error error={error} />
//           if (loading) return <p>Loading...</p>
//           const { ownerProperties } = data
//           const { modalIsOpen, modalDetailsObj } = this.state
//           return (
//             <Mutation
//               mutation={UPDATE_PROPERTY_MUTATION}
//               optimisticResponse={this._OptimisticResponse()}
//               refetchQueries={[{ query: PROPERTIES_QUERY }]}
//               update={this.updateCache}>
//               {(updateProperty, { loading, error }) => (
//                 <>
//                   <Modal
//                     title={`Property Viewer`}
//                     open={modalIsOpen}
//                     close={() => this.closeModal()}>
//                     {this.renderModalDetails()}
//                   </Modal>
//                   <SuperTable
//                     columnHeaders={this.columnHeaders()}
//                     // tags={{
//                     //   found: "tags",
//                     //   key: "id",
//                     //   options: [{ name: "one", value: "one" }],
//                     //   // options: allTags
//                     //   //   ? allTags.map(t => ({ name: t.name, value: t.id }))
//                     //   //   : [],
//                     // }}
//                     title="My Properties"
//                     data={ownerProperties}
//                     executeFunc={async (funcName, obj) => {
//                       switch (funcName) {
//                         case "toggleOnTheMarket":
//                           await this.setState({ updateData: obj })
//                           return this._updateProperty(updateProperty, obj)
//                         default:
//                           return this.executeFunctionByName(funcName, obj)
//                       }
//                     }}
//                   />
//                 </>
//               )}
//             </Mutation>
//           )
//         }}
//       </Query>
//     )
//   }

//   _updateProperty = async (updateProperty, data) => {
//     const res = await updateProperty({
//       variables: {
//         id: data.id,
//         data: {
//           onTheMarket: !data.onTheMarket,
//         },
//       },
//     })

//     const message = data.onTheMarket ? (
//       <div>
//         <h3>Removed Property From The Market</h3>{" "}
//         <strong>{res.data.updateProperty.location}</strong> is now off the
//         market
//       </div>
//     ) : (
//       <div>
//         <h3>Added Property To The Market</h3>
//         <strong>{res.data.updateProperty.location}</strong> is now on the market
//       </div>
//     )

//     {
//       data.onTheMarket
//         ? toast.info(<p>{message}</p>)
//         : toast.success(<p>{message}</p>)
//     }
//     // toast(message)
//   }

//   updateCache = (cache, payload) => {
//     const data = cache.readQuery({ query: PROPERTIES_QUERY })
//     const updatedPropertyData = payload.data.updateProperty
//     const allProperties = data.ownerProperties
//     const idToSearchBy = updatedPropertyData.id
//     const foundIndex = allProperties.findIndex(p => p.id === idToSearchBy)
//     data.ownerProperties[foundIndex] = {
//       ...data.ownerProperties[foundIndex],
//       ...payload.data.updateProperty,
//     }
//     cache.writeQuery({ query: PROPERTIES_QUERY, data })
//   }

//   showDetails = dataObj => {
//     this.openModal()
//     this.setState({
//       modalDetailsObj: dataObj,
//     })
//   }

//   closeModal() {
//     this.setState({
//       modalIsOpen: false,
//     })
//   }
//   openModal() {
//     this.setState({
//       modalIsOpen: true,
//     })
//   }

//   renderModalDetails = () => {
//     const { modalDetailsObj } = this.state
//     const { id, location, rent } = modalDetailsObj
//     return <PropertyDetails id={id} />
//   }

//   manageProperty = data => {
//     handleLink("/my/property", { id: data.id })
//   }

//   toggleOnTheMarket = dataObj => {
//     const current = dataObj.onTheMarket
//     this.props.updateProperty({
//       variables: { id: dataObj.id, onTheMarket: !current },
//     })
//   }

//   executeFunctionByName = (functionName, dataObj /*, args */) => {
//     switch (functionName) {
//       case "showDetails":
//         this.showDetails(dataObj)
//         break
//       case "manageProperty":
//         return this.manageProperty(dataObj)
//       case "toggleOnTheMarket":
//         return this.toggleOnTheMarket(dataObj)
//       default:
//         alert("No function specified")
//     }
//   }
// }

// export default compose(
//   graphql(UPDATE_PROPERTY_MUTATION, { name: "updateProperty" }),
//   withApollo
// )(OwnerProperties)

// export { OWNER_PROPERTIES_QUERY }

import React, { Component } from "react"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"
import Error from "../ErrorMessage/index"
import SuperTable from "../SuperTable/index"
import Button from "@material-ui/core/Button"
import Modal from "../Modal/index"
import PropertyDetails from "../PropertyDetails/index"
import { ToastContainer, toast } from "react-toastify"
import Router from "next/router"
import { graphql, withApollo } from "react-apollo"
import { PROPERTIES_QUERY } from "../../query/index"
const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const OWNER_PROPERTIES_QUERY = gql`
  query OWNER_PROPERTIES_QUERY {
    ownerProperties {
      id
      rooms
      rent
      moveInDate
      expiryDate
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
      isLeased
    }
  }
`

const UPDATE_PROPERTY_MUTATION = gql`
  mutation UPDATE_PROPERTY_MUTATION($id: ID!, $data: PropertyUpdateInput!) {
    updateProperty(id: $id, data: $data) {
      id
      onTheMarket
      location
    }
  }
`

class OwnerProperties extends Component {
  state = {
    modalIsOpen: false,
    modalDetailsObj: {},
  }
  columnHeaders = () => {
    return [
      {
        id: "location",
        numeric: false,
        // disablePadding: true,
        label: "location",
        show: true,
        tableRenderKey: "th",
        found: "location",
        searchable: true,
        tableRenderProps: {
          size: "medium",
          style: {
            minWidth: "220px",
          },
        },
      },
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
        id: "onTheMarket",
        numeric: false,
        type: "checkbox",
        // disablePadding: true,
        label: "onTheMarket",
        show: true,
        tableRenderKey: "th",
        found: "onTheMarket",
        funcName: "toggleOnTheMarket",
        searchable: true,
      },
      {
        id: "isLeased",
        numeric: false,
        type: "truthly",
        // disablePadding: true,
        label: "isLeased",
        show: true,
        tableRenderKey: "th",
        found: "isLeased",
      },
      {
        id: "moveInDate",
        numeric: false,
        // type: "checkbox",
        // disablePadding: true,
        label: "moveInDate",
        show: true,
        tableRenderKey: "th",
        found: "moveInDate",
        searchable: true,
      },
      {
        id: "expiryDate",
        numeric: false,
        // type: "checkbox",
        // disablePadding: true,
        label: "expiryDate",
        show: true,
        tableRenderKey: "th",
        found: "expiryDate",
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
        disablePadding: false,
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
        funcName: "manageProperty",
        tableRenderKey: "th",
      },
    ]
  }

  _OptimisticResponse = () => {
    if (!this.state.updateData) return undefined
    return {
      __typename: "Mutation",
      updateProperty: {
        __typename: "Property",
        id: this.state.updateData.id,
        onTheMarket: !this.state.updateData.onTheMarket,
      },
    }
  }

  render() {
    return (
      <Query query={OWNER_PROPERTIES_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          const { ownerProperties } = data
          const { modalIsOpen, modalDetailsObj } = this.state
          return (
            <Mutation
              mutation={UPDATE_PROPERTY_MUTATION}
              optimisticResponse={this._OptimisticResponse()}
              refetchQueries={[{ query: PROPERTIES_QUERY }]}
              update={this.updateCache}>
              {(updateProperty, { loading, error }) => (
                <>
                  <Modal
                    title={`Property Viewer`}
                    open={modalIsOpen}
                    close={() => this.closeModal()}>
                    {this.renderModalDetails()}
                  </Modal>
                  <SuperTable
                    columnHeaders={this.columnHeaders()}
                    // tags={{
                    //   found: "tags",
                    //   key: "id",
                    //   options: [{ name: "one", value: "one" }],
                    //   // options: allTags
                    //   //   ? allTags.map(t => ({ name: t.name, value: t.id }))
                    //   //   : [],
                    // }}
                    title="My Properties"
                    data={ownerProperties}
                    executeFunc={async (funcName, obj) => {
                      switch (funcName) {
                        case "toggleOnTheMarket":
                          await this.setState({ updateData: obj })
                          return this._updateProperty(updateProperty, obj)
                        default:
                          return this.executeFunctionByName(funcName, obj)
                      }
                    }}
                  />
                </>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }

  _updateProperty = async (updateProperty, data) => {
    const res = await updateProperty({
      variables: {
        id: data.id,
        data: {
          onTheMarket: !data.onTheMarket,
        },
      },
    })

    const message = data.onTheMarket ? (
      <div>
        <h3>Removed Property From The Market</h3>{" "}
        <strong>{res.data.updateProperty.location}</strong> is now off the
        market
      </div>
    ) : (
      <div>
        <h3>Added Property To The Market</h3>
        <strong>{res.data.updateProperty.location}</strong> is now on the market
      </div>
    )

    {
      data.onTheMarket
        ? toast.info(<p>{message}</p>)
        : toast.success(<p>{message}</p>)
    }
    // toast(message)
  }

  updateCache = (cache, payload) => {
    const data = cache.readQuery({ query: PROPERTIES_QUERY })
    const updatedPropertyData = payload.data.updateProperty
    const allProperties = data.ownerProperties
    const idToSearchBy = updatedPropertyData.id
    const foundIndex = allProperties.findIndex(p => p.id === idToSearchBy)
    data.ownerProperties[foundIndex] = {
      ...data.ownerProperties[foundIndex],
      ...payload.data.updateProperty,
    }
    cache.writeQuery({ query: PROPERTIES_QUERY, data })
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

  renderModalDetails = () => {
    const { modalDetailsObj } = this.state
    const { id, location, rent } = modalDetailsObj
    return <PropertyDetails id={id} />
  }

  manageProperty = data => {
    handleLink("/my/property", { id: data.id })
  }

  toggleOnTheMarket = dataObj => {
    const current = dataObj.onTheMarket
    this.props.updateProperty({
      variables: { id: dataObj.id, onTheMarket: !current },
    })
  }

  executeFunctionByName = (functionName, dataObj /*, args */) => {
    switch (functionName) {
      case "showDetails":
        this.showDetails(dataObj)
        break
      case "manageProperty":
        return this.manageProperty(dataObj)
      case "toggleOnTheMarket":
        return this.toggleOnTheMarket(dataObj)
      default:
        alert("No function specified")
    }
  }
}

export default withApollo()(OwnerProperties)

export { OWNER_PROPERTIES_QUERY }
