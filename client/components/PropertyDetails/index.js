import React, { Component, useState, useEffect } from "react"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { useQuery } from "react-apollo-hooks"
import { SINGLE_OWNER_PROPERTY_QUERY } from "../../query/index"
import Error from "../ErrorMessage/index"
import styled from "styled-components"
import Head from "next/head"
import Tabs from "@material-ui/core/Tabs"
// import Tab from "@material-ui/core/Tab"
import Tab from "../../styles/Tab"
// tabs
import Details from "./Details"
import Leases from "./Leases"
import Applications from "./Applications"
// import Badge from "@material-ui/core/Badge"
import Badge from "../../styles/Badge"
import Typography from "@material-ui/core/Typography"
// constants
import { SITE_NAME } from "../../lib/const"

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const PropertyCard = styled.div`
  max-width: 1200px;
  /* margin: 2rem auto; */
  margin: 0;
  box-shadow: ${props => props.theme.bs};
  box-sizing: border-box;
  min-height: 800px;
  .location__name {
    margin: 0;
    padding: 16px;
    line-height: 1;
  }
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
    /* display: flex;
    flex-wrap: wrap; */
  }
`
/**
 *
 * Could be a good time to do a fragment
 * i.e on the property query have a fragment for all of the applications
 */
const PropertyDetails = ({ id }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const { data, loading, error } = useQuery(SINGLE_OWNER_PROPERTY_QUERY, {
    variables: {
      id: id,
    },
  })
  if (loading) return "loading"
  if (error) return "error"
  const property = data.ownerProperty

  console.log("The Property Data feteched => ", property)

  return (
    <PropertyCard>
      <Head>
        <title>
          {SITE_NAME} | {property.location}
        </title>
      </Head>
      <h1 className="location__name"> {property.location}</h1>
      <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
        <Tab label="Details" />
        <Tab
          label={
            <Badge color="secondary" badgeContent={4}>
              Applications
            </Badge>
          }
        />
        <Tab label="Leases" />
      </Tabs>
      {tabIndex === 0 && (
        <TabContainer>
          <Details property={property} />
        </TabContainer>
      )}
      {tabIndex === 1 && (
        <TabContainer>
          <Applications property={property} />
        </TabContainer>
      )}
      {tabIndex === 2 && (
        <TabContainer>
          <Leases />
        </TabContainer>
      )}
    </PropertyCard>
  )
}

/*
class SingleItem extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }
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
          const property = data.ownerProperty
          const { value } = this.state
          return (
            <SingleItemStyles>
              <Head>
                <title>Re_Houser | {property.location}</title>
              </Head>
              <h1 className="location__name"> {property.location}</h1>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Details" />
                <Tab
                  label={
                    <Badge color="secondary" badgeContent={4}>
                      Applications
                    </Badge>
                  }
                />
                <Tab label="Leases" />
              </Tabs>
              {value === 0 && (
                <TabContainer>
                  <Details property={property} />
                </TabContainer>
              )}
              {value === 1 && (
                <TabContainer>
                  <Applications />
                </TabContainer>
              )}
              {value === 2 && (
                <TabContainer>
                  <Leases />
                </TabContainer>
              )}
            </SingleItemStyles>
          )
        }}
      </Query>
    )
  }
}
*/

export default PropertyDetails
