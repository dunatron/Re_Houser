import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../../styles/Form';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../User/index';
import FabButton from '../../styles/FabButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import TextInput from '../../styles/TextInput';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      firstName
      lastName
    }
  }
`;

class Signin extends Component {
  state = {
    password: '',
    email: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  _signIn = async signin => {
    const res = await signin();
    toast.success(
      <p>
        <strong>
          Welcome {res.data.signin.firstName} {res.data.signin.lastName}
        </strong>
      </p>
    );
    this.setState({ email: '', password: '' });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={e => {
              e.preventDefault();
              // await signin()
              this._signIn(signin);
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
              <TextInput
                id="email"
                label="Email"
                fullWidth={true}
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.saveToState}
              />
              <TextInput
                id="password"
                label="Password"
                fullWidth={true}
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />

              <FabButton
                type="submit"
                variant="extended"
                color="primary"
                aria-label="Add"
                style={{ minWidth: 160 }}>
                <NavigationIcon style={{ marginRight: 5 }} />
                Sign In
              </FabButton>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
