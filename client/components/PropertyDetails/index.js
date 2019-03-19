import React, { Component } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Error from "../ErrorMessage/index"
import styled from "styled-components"
import Head from "next/head"

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  box-sizing: border-box;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    box-sizing: border-box;
    margin: 3rem;
    font-size: 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
    display: flex;
    flex-wrap: wrap;
    .details {
      box-sizing: border-box;
      margin: 0 1rem;
      font-size: 1.2rem;
    }
  }
`

const SINGLE_PROPERTY_QUERY = gql`
  query SINGLE_PROPERTY_QUERY($id: ID!) {
    ownerProperty(id: $id) {
      id
      location
      rent
    }
  }
`
class SingleItem extends Component {
  render() {
    return (
      <Query
        query={SINGLE_PROPERTY_QUERY}
        variables={{
          id: this.props.id,
        }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          if (!data.ownerProperty)
            return <p>No Item Found for {this.props.id}</p>
          const item = data.ownerProperty
          return (
            <SingleItemStyles>
              <Head>
                <title>Re_Houser | {item.location}</title>
              </Head>
              <h1>A single property</h1>
              <p>This will be a rich screen with a lot of functionality. </p>
            </SingleItemStyles>
          )
        }}
      </Query>
    )
  }
}

export default SingleItem
export { SINGLE_PROPERTY_QUERY }
