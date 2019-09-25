import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import Account from '../components/Account/index';

export default class AccountPage extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn
          alert={
            <div>
              <p>
                <strong>Please Sign In</strong>
              </p>
              <p>You must be signed in to view your account</p>
            </div>
          }>
          <Account />
        </PleaseSignIn>
      </div>
    );
  }
}
