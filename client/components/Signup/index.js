// import React, { Component } from 'react';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
// import Form from '../../styles/Form';
// import Error from '../ErrorMessage/index';
// import { CURRENT_USER_QUERY } from '../User/index';
// import FabButton from '../../styles/FabButton';
// import NavigationIcon from '@material-ui/icons/Navigation';
// import TextInput from '../../styles/TextInput';
// import Router from 'next/router';
// import Button from '@material-ui/core/Button';
// import { toast } from 'react-toastify';
// import { SIGNUP_MUTATION } from '../../graphql/mutations';

// class Signup extends Component {
//   state = {
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     password: '',
//   };
//   saveToState = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   handleLink = (route = '/', query = {}) => {
//     Router.push({
//       pathname: route,
//       query: query,
//     });
//   };
//   _signUp = async signup => {
//     const res = await signup();
//     const accountBtn = (
//       <Button
//         color="secondary"
//         onClick={() => {
//           this.handleLink('/account');
//         }}>
//         Update Profile
//       </Button>
//     );
//     toast.info(
//       <div>
//         <h1>Congrats on signing up</h1>
//         {accountBtn}
//       </div>,
//       {
//         position: toast.POSITION.TOP_RIGHT,
//         // closeOnClick: false,
//         autoClose: 15000,
//       }
//     );
//     this.setState({
//       firstName: '',
//       lastName: '',
//       phone: '',
//       email: '',
//       password: '',
//     });
//   };
//   render() {
//     return (
//       <Mutation
//         mutation={SIGNUP_MUTATION}
//         variables={this.state}
//         refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
//         {(signup, { error, loading }) => (
//           <Form
//             method="post"
//             onSubmit={async e => {
//               e.preventDefault();
//               // await signup()
//               this._signUp(signup);
//             }}>
//             <fieldset disabled={loading} aria-busy={loading}>
//               <Error error={error} />
//               <TextInput
//                 id="email"
//                 label="Email"
//                 fullWidth={true}
//                 type="email"
//                 name="email"
//                 placeholder="please enter your email"
//                 value={this.state.email}
//                 onChange={this.saveToState}
//               />
//               <TextInput
//                 id="name"
//                 label="First Name"
//                 fullWidth={true}
//                 type="text"
//                 name="firstName"
//                 placeholder="please enter your firstname"
//                 value={this.state.firstName}
//                 onChange={this.saveToState}
//               />
//               <TextInput
//                 id="name"
//                 label="Last Name"
//                 fullWidth={true}
//                 type="text"
//                 name="lastName"
//                 placeholder="please enter your lastname"
//                 value={this.state.lastName}
//                 onChange={this.saveToState}
//               />
//               <TextInput
//                 id="name"
//                 label="Phone Number"
//                 fullWidth={true}
//                 type="text"
//                 name="phone"
//                 placeholder="please enter your phone number"
//                 value={this.state.phone}
//                 onChange={this.saveToState}
//               />
//               <TextInput
//                 id="password"
//                 label="Password"
//                 fullWidth={true}
//                 type="password"
//                 name="password"
//                 placeholder="password"
//                 value={this.state.password}
//                 onChange={this.saveToState}
//               />

//               <FabButton
//                 type="submit"
//                 variant="extended"
//                 color="primary"
//                 aria-label="Add"
//                 style={{ minWidth: 160 }}>
//                 <NavigationIcon style={{ marginRight: 5 }} />
//                 Sign Up
//               </FabButton>
//             </fieldset>
//           </Form>
//         )}
//       </Mutation>
//     );
//   }
// }

// export default Signup;
// export { SIGNUP_MUTATION };

import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Form from '../../styles/Form';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../User/index';
import FabButton from '../../styles/FabButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import TextInput from '../../styles/TextInput';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { SIGNUP_MUTATION } from '../../graphql/mutations';

const Signup = props => {
  const [state, setState] = useState({
    firstName: props.firstName ? props.firstName : '',
    lastName: props.lastName ? props.lastName : '',
    phone: props.phone ? props.phone : '',
    email: props.email ? props.email : '',
    password: props.password ? props.password : '',
  });
  const saveToState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const [signUp, { error, loading, data }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      state,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleLink = (route = '/', query = {}) => {
    Router.push({
      pathname: route,
      query: query,
    });
  };
  const accountBtn = (
    <Button
      color="secondary"
      onClick={() => {
        handleLink('/account');
      }}>
      Update Profile
    </Button>
  );
  if (data) {
    toast.info(
      <div>
        <h1>Congrats on signing up</h1>
        {accountBtn}
      </div>,
      {
        position: toast.POSITION.TOP_RIGHT,
        // closeOnClick: false,
        autoClose: 15000,
      }
    );
  }
  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        signUp();
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <Error error={error} />
        <TextInput
          id="email"
          label="Email"
          fullWidth={true}
          type="email"
          name="email"
          placeholder="please enter your email"
          value={state.email}
          onChange={saveToState}
        />
        <TextInput
          id="name"
          label="First Name"
          fullWidth={true}
          type="text"
          name="firstName"
          placeholder="please enter your firstname"
          value={state.firstName}
          onChange={saveToState}
        />
        <TextInput
          id="name"
          label="Last Name"
          fullWidth={true}
          type="text"
          name="lastName"
          placeholder="please enter your lastname"
          value={this.state.lastName}
          onChange={this.saveToState}
        />
        <TextInput
          id="name"
          label="Phone Number"
          fullWidth={true}
          type="text"
          name="phone"
          placeholder="please enter your phone number"
          value={this.state.phone}
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
          Sign Up
        </FabButton>
      </fieldset>
    </Form>
  );
};

export default Signup;
export { SIGNUP_MUTATION };
