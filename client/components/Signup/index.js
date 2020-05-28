import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
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
import ReCAPTCHA from 'react-google-recaptcha';
import ButtonLoader from '../Loader/ButtonLoader';

const Signup = props => {
  const recaptchaRef = useRef();
  const clearRecaptcha = () => recaptchaRef.current.reset();
  const [state, setState] = useState({
    firstName: props.firstName ? props.firstName : '',
    lastName: props.lastName ? props.lastName : '',
    phone: props.phone ? props.phone : '',
    email: props.email ? props.email : '',
    password: props.password ? props.password : '',
    captchaToken: '',
  });
  const saveToState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    props.update(e);
  };

  const handleCompleted = data => {
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
    clearRecaptcha();
  };

  const handleOnError = error => {
    clearRecaptcha();
  };

  const [signUp, { error, loading, data }] = useMutation(SIGNUP_MUTATION, {
    variables: state,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: handleCompleted,
    onError: handleOnError,
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
      onSubmit={async e => {
        e.preventDefault();
        signUp();
      }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <Error error={error} />
        <TextInput
          id="signup-email"
          inputProps={{
            'data-cy': 'signup-email',
          }}
          label="Email"
          fullWidth={true}
          type="email"
          name="email"
          placeholder="please enter your email"
          value={state.email}
          onChange={saveToState}
        />
        <TextInput
          id="signup-firstName"
          inputProps={{
            'data-cy': 'signup-firstName',
          }}
          label="First Name"
          fullWidth={true}
          type="text"
          name="firstName"
          placeholder="please enter your firstname"
          value={state.firstName}
          onChange={saveToState}
        />
        <TextInput
          id="signup-lastName"
          inputProps={{
            'data-cy': 'signup-lastName',
          }}
          label="Last Name"
          fullWidth={true}
          type="text"
          name="lastName"
          placeholder="please enter your lastname"
          value={state.lastName}
          onChange={saveToState}
        />
        <TextInput
          id="signup-phone"
          inputProps={{
            'data-cy': 'signup-phone',
          }}
          label="Phone Number"
          fullWidth={true}
          type="text"
          name="phone"
          placeholder="please enter your phone number"
          value={state.phone}
          onChange={saveToState}
        />
        <TextInput
          id="signup-password"
          inputProps={{
            'data-cy': 'signup-password',
          }}
          label="Password"
          fullWidth={true}
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={saveToState}
        />
        <ReCAPTCHA
          data-cy="signup-recaptcha-component"
          ref={recaptchaRef}
          sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
          // this will require an investigation on its own. how to render these process.env with next
          // check next.config
          onChange={token =>
            setState({
              ...state,
              captchaToken: token,
            })
          }
        />
        <ButtonLoader
          type="submit"
          data-cy="submit-signup"
          // variant="filled"
          loading={loading}
          text="Sign Up"
          successText="Signed Up"
          style={{
            marginTop: '16px',
          }}
          color="secondary"
          disabled={state.captchaToken.length <= 0 ? true : false || loading}
          success={false}>
          <NavigationIcon style={{ marginRight: 5 }} />
        </ButtonLoader>
      </fieldset>
    </Form>
  );
};

export default Signup;
export { SIGNUP_MUTATION };
