import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from '@/Styles/Form';
import Error from '@/Components/ErrorMessage/index';
import { CURRENT_USER_QUERY } from '@/Components/User/index';
import FabButton from '@/Styles/FabButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import TextInput from '@/Styles/TextInput';
import Router from 'next/router';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { toast } from 'react-toastify';
import { SIGNUP_MUTATION } from '@/Gql/mutations';
// import ReCAPTCHA from 'react-google-recaptcha';
import ReCAPTCHA from '@/Components/Recaptcha';
import ButtonLoader from '@/Components/Loader/ButtonLoader';
import ConfinedHeight from '@/Components/ConfinedHeight';
import SignupTerms from '@/Components/Terms/SignupTerms';
import PhoneInput from '@/Components/Inputs/PhoneInput';
import PasswordInput from '@/Components/Inputs/Password';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const Signup = props => {
  const recaptchaRef = useRef();
  const clearRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };
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
    setCookie(null, 'token', data.signup.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setCookie(null, 'refresh-token', data.signup.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

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

    // we should create a message between the admin and rehouser?

    props.handleCompleted();
  };

  const handleOnError = error => {
    clearRecaptcha();
  };

  const [signUp, { error, loading, data }] = useMutation(SIGNUP_MUTATION, {
    variables: state,
    update(cache, { data: { signup } }) {
      cache.modify({
        fields: {
          me(existingMeRef = {}, { readField }) {
            return { ...signup };
          },
        },
      });
    },
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
            autoComplete: 'email',
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
            autoComplete: 'given-name',
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
            autoComplete: 'family-name',
          }}
          label="Last Name"
          fullWidth={true}
          type="text"
          name="lastName"
          placeholder="please enter your lastname"
          value={state.lastName}
          onChange={saveToState}
        />
        <PhoneInput
          id="signup-phone"
          defaultCountry={'nz'}
          // regions={['oceania']}
          inputProps={{
            'data-cy': 'signup-phone',
            autoComplete: 'tel',
          }}
          name="phone"
          label="Phone Number"
          fullWidth={true}
          placeholder="please enter your phone number"
          onChange={v => {
            setState({
              ...state,
              phone: v,
            });
          }}
        />
        <PasswordInput
          id="signup-password"
          inputProps={{
            'data-cy': 'signup-password',
            autoComplete: 'new-password',
          }}
          label="Password"
          fullWidth={true}
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={saveToState}
        />
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
          {/* theme */}
          <ReCAPTCHA
            data-cy="signup-recaptcha-component"
            ref={recaptchaRef}
            sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
            onChange={token =>
              setState({
                ...state,
                captchaToken: token,
              })
            }
          />
        </div>
        <Error error={error} />
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

Signup.propTypes = {
  email: PropTypes.any,
  firstName: PropTypes.any,
  handleCompleted: PropTypes.func.isRequired,
  lastName: PropTypes.any,
  password: PropTypes.any,
  phone: PropTypes.any,
  update: PropTypes.func.isRequired,
};

export default Signup;
export { SIGNUP_MUTATION };
