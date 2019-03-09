import React, { Component } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Error from "../ErrorMessage/index"
import PropertyCard from "../PropertyCard/index"

const PROPERTIES_QUERY = gql`
  query PROPERTIES_QUERY {
    properties {
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
  render() {
    return (
      <Query query={PROPERTIES_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          const { properties } = data
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}>
              {properties.map((property, i) => (
                <PropertyCard key={i} property={property} />
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}
