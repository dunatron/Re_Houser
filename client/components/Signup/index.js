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
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { toast } from 'react-toastify';
import { SIGNUP_MUTATION } from '../../graphql/mutations';
import ReCAPTCHA from 'react-google-recaptcha';
import ButtonLoader from '../Loader/ButtonLoader';
import ConfinedHeight from '../../components/ConfinedHeight';
import SignupTerms from '../Terms/SignupTerms';

const Signup = props => {
  const recaptchaRef = useRef();
  const clearRecaptcha = () => recaptchaRef.current.reset();
  const [state, setState] = useState({
    firstName: props.firstName ? props.firstName : '',
    lastName: props.lastName ? props.lastName : '',
    phone: props.phone ? props.phone : '',
    email: props.email ? props.email : '',
    password: props.password ? props.password : '',
    acceptedSignupTerms: false,
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

  const canSignup = () => {
    // state.captchaToken.length <= 0 ? true : false || loading
    if (state.captchaToken.length <= 0) return false;
    if (loading) return false;
    if (state.acceptedSignupTerms !== true) return false;
    if (state.firstName.length < 2) return false;
    if (state.lastName.length < 2) return false;
    if (state.email.length < 2) return false;
    return true;
  };

  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        signUp();
      }}>
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className="main-fieldset">
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

        {/* ToDo: add button that they must actually check */}
        <div>
          ToDo: add button that they must actually check for
          acceptUserTerms(also to add to backend)
        </div>
        {/* Max height scroll component */}
        <ConfinedHeight maxHeight="300px">
          <SignupTerms />
        </ConfinedHeight>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.acceptedSignupTerms}
              onChange={e =>
                setState({
                  ...state,
                  acceptedSignupTerms: e.target.checked,
                })
              }
              name="acceptTerms"
              color="primary"
            />
          }
          label="Accept Terms"
        />
        <div
          style={{
            padding: '16px 0',
          }}>
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
        </div>
        <ButtonLoader
          type="submit"
          data-cy="submit-signup"
          loading={loading}
          text="Sign Up"
          successText="Signed Up"
          style={{
            marginTop: '16px',
          }}
          color="secondary"
          disabled={!canSignup()}
          success={false}>
          <NavigationIcon style={{ marginRight: 5 }} />
        </ButtonLoader>
      </fieldset>
    </Form>
  );
};

export default Signup;
export { SIGNUP_MUTATION };
