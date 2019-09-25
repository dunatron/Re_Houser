import React, { Component } from 'react';
import CreateProperty from '../../components/CreateProperty/index';
import PleaseSignIn from '../../components/PleaseSignIn';

export default class index extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn
          message={'You need to be signed in to add property'}
          alert={
            <p>
              <strong>Please sign up to add property to the platform</strong>
            </p>
          }>
          <CreateProperty />
        </PleaseSignIn>
      </div>
    );
  }
}
