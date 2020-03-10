import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import ChangeRouteButton from '../Routes/ChangeRouteButton';

// query propertyLeases($where:PropertyLeaseWhereInput) {
//   propertyLeases(where: $where) {
//     id
//   }
// }

// {
//   "where": {
//     "property": {
//       "id": ""
//     }
//   }
// }

const SINGLE_PROPERTY_LEASES_QUERY = gql`
  query SINGLE_PROPERTY_LEASES_QUERY($where: PropertyLeaseWhereInput) {
    myLeases(where: $where) {
      id
      location
      rent
      lessees {
        id
        user {
          id
          email
        }
      }
      lessors {
        id
        user {
          id
          email
        }
      }
    }
  }
`;

const PropertyLeases = props => {
  const { data, error, loading } = useQuery(SINGLE_PROPERTY_LEASES_QUERY, {
    variables: {
      where: {
        property: {
          id: props.property.id,
        },
      },
    },
    suspend: false,
  });
  if (loading) return 'loading leaseas';
  if (error) return 'Error with feting leases';
  return (
    <div>
      <h1>I am the Leases details component</h1>
      {data.myLeases.map((lease, i) => {
        return (
          <div>
            <button onClick={() => alert('ROute To Lease Page')}>
              EDIT LEASE
            </button>
            <ChangeRouteButton
              title="Edit Lease"
              route="/leases/lease"
              query={{ id: lease.id }}
            />
            <p>{lease.id}</p>
            <p>{lease.location}</p>
            <p>{lease.rent}</p>
            <h4>Owners</h4>
            {lease.lessors.map(owner => {
              return (
                <div>
                  <p>{owner.id}</p>
                </div>
              );
            })}
            <h4>Tenants</h4>
            {lease.lessees.map(tenant => {
              return (
                <div>
                  <p>{tenant.id}</p>
                </div>
              );
            })}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default PropertyLeases;
