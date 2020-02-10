import React, { Component, useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../../styles/Form';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../User/index';
import FabButton from '../../styles/FabButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import TextInput from '../../styles/TextInput';
import { SIGNIN_MUTATION } from '../../graphql/mutations';
import ReCAPTCHA from 'react-google-recaptcha';

// class Signin extends Component {
//   state = {
//     password: '',
//     email: '',
//   };
//   saveToState = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   _signIn = async signin => {
//     const res = await signin();
//     toast.success(
//       <p>
//         <strong>
//           Welcome {res.data.signin.firstName} {res.data.signin.lastName}
//         </strong>
//       </p>
//     );
//     this.setState({ email: '', password: '' });
//   };
//   render() {
//     return (
//       <Mutation
//         mutation={SIGNIN_MUTATION}
//         variables={this.state}
//         refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
//         {(signin, { error, loading }) => (
//           <Form
//             method="post"
//             onSubmit={e => {
//               e.preventDefault();
//               // await signin()
//               this._signIn(signin);
//             }}>
//             <fieldset disabled={loading} aria-busy={loading}>
//               <Error error={error} />
//               <TextInput
//                 id="email"
//                 label="Email"
//                 fullWidth={true}
//                 type="email"
//                 name="email"
//                 placeholder="email"
//                 value={this.state.email}
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
//                 Sign In
//               </FabButton>
//             </fieldset>
//           </Form>
//         )}
//       </Mutation>
//     );
//   }
// }

// export default Signin;

const Signin = props => {
  const [state, setState] = useState({
    email: props.email ? props.email : '',
    password: props.password ? props.password : '',
    captchaToken: '',
  });
  const recaptchaRef = useRef();

  const clearRecaptcha = () => recaptchaRef.current.reset();
  const [signIn, { loading, error, data }] = useMutation(SIGNIN_MUTATION);
  const saveToState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    props.update(e);
    // ToDo: push up to if we have update function to tell the container
  };
  if (data) {
    toast.success(
      <p>
        <strong>
          Welcome {data.signin.firstName} {data.signin.lastName}
        </strong>
      </p>
    );
  }
  useEffect(() => {
    setState({
      ...state,
      email: props.email,
    });
  }, [props.email]);
  useEffect(() => {
    setState({
      ...state,
      password: props.password,
    });
  }, [props.password]);
  return (
    <Form
      method="post"
      onSubmit={e => {
        e.preventDefault();
        signIn({
          variables: state,
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        clearRecaptcha();
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <Error error={error} />
        <TextInput
          id="email"
          data-cy="email"
          label="Email"
          fullWidth={true}
          type="email"
          name="email"
          placeholder="email"
          value={state.email}
          onChange={saveToState}
        />
        <TextInput
          id="password"
          label="Password"
          data-cy="password"
          fullWidth={true}
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={saveToState}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
          onChange={token => {
            console.log('captcha c => ', token);
            setState({
              ...state,
              captchaToken: token,
            });
          }}
        />

        <FabButton
          type="submit"
          data-cy="submit-login"
          variant="extended"
          color="primary"
          aria-label="Add"
          style={{ minWidth: 160 }}>
          <NavigationIcon style={{ marginRight: 5 }} />
          Sign In
        </FabButton>
      </fieldset>
    </Form>
  );
};

export default Signin;
