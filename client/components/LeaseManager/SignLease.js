import React, { Component } from 'react';
import { adopt } from 'react-adopt';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import User from '../User/index';
import Error from '../ErrorMessage';
import FinaliseLeaseBtn from '../MutationButtons/FinaliseLeaseButton';
import SignLeaseBtn from '../MutationButtons/SignLeaseButton';
const SignLease = ({ lease, me }) => {
  const { id, finalised, rent, location, lessors, lessees } = lease;
  return (
    <div>
      <FinaliseLeaseBtn leaseId={id} finalised={finalised} />
      {/* <SignLeaseBtn leaseId={leaseId} type={"LESSOR"} id={} /> */}
      <h1>I am The Lease Manager</h1>
      <p>Finalised => {finalised ? 'YES' : 'NO'}</p>
      <p>lease ID => {id}</p>
      <p>lease rent => {rent}</p>
      <p>lease location => {location}</p>
      <h4>Lessors</h4>
      {lessors.map(lessor => {
        return (
          <div>
            <p>Unique Lessor ID => {lessor.id}</p>
            <p>Signed => {lessor.signed ? 'YES' : 'NO'}</p>
            <p>lessor User details</p>
            {lessor.user.id === me.id && (
              <SignLeaseBtn
                leaseId={id}
                type={'LESSOR'}
                id={lessor.id}
                signed={lessor.signed}
              />
            )}
            <ul>
              <li>{lessor.user.id}</li>
              <li>{lessor.user.email}</li>
            </ul>
          </div>
        );
      })}
      <h4>Lessees</h4>
      {lessees.map(lessee => {
        return (
          <div>
            <p>Unique lessee ID => {lessee.id}</p>
            <p>Signed => {lessee.signed ? 'YES' : 'NO'}</p>
            <p>lessee User details</p>
            {lessee.user.id === me.id && (
              <SignLeaseBtn
                leaseId={id}
                type={'LESSEE'}
                id={lessee.id}
                signed={lessee.signed}
              />
            )}
            <ul>
              <li>{lessee.user.id}</li>
              <li>{lessee.user.email}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default SignLease;
