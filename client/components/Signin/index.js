import React, { Component, useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import Form from '../../styles/Form';
import Error from '../ErrorMessage/index';
import { CURRENT_USER_QUERY } from '../User/index';
import FabButton from '../../styles/FabButton';
import NavigationIcon from '@material-ui/icons/Navigation';
// import TextInput from '../../styles/TextInput';
import TextInput from '../../styles/TextInput';
import { SIGNIN_MUTATION } from '../../graphql/mutations';
import ReCAPTCHA from 'react-google-recaptcha';
import ButtonLoader from '../Loader/ButtonLoader';

const Signin = props => {
  const [state, setState] = useState({
    email: props.email ? props.email : '',
    password: props.password ? props.password : '',
    captchaToken: '',
  });

  const recaptchaRef = useRef();

  const clearRecaptcha = () => recaptchaRef.current.reset();

  const handleCompleted = data => {
    toast.success(
      <p>
        <strong>
          Welcome {data.signin.firstName} {data.signin.lastName}
        </strong>
      </p>
    );
    clearRecaptcha();
    props.handleCompleted(data);
  };
  const handleOnError = error => {
    clearRecaptcha();
  };

  const [signIn, { loading, error, data, called }] = useMutation(
    SIGNIN_MUTATION,
    {
      onCompleted: handleCompleted,
      onError: handleOnError,
    }
  );
  const saveToState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    props.update(e);
    // ToDo: push up to if we have update function to tell the container
  };

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
          // refetchQueries: [{ query: CURRENT_USER_QUERY }],
          update: (cache, data) => {
            console.log('Signin cache => ', cache);
            console.log('Signin data => ', data);
            // cache.modify({
            //   id: cache.identify(myObject),
            //   fields: {
            //     ...data.signin,
            //   },
            //   /* broadcast: false // Include this to prevent automatic query refresh */
            // });
            cache.modify({
              fields: {
                me(existingMeRefs, { readField }) {
                  console.log(
                    'WIll this even work => existingRefs ',
                    existingMeRefs
                  );
                  console.log(
                    'WIll this even work => readField ',
                    existingMeRefs
                  );
                },
              },
            });
          },
        });
      }}>
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className="main-fieldset">
        <Error error={error} />
        <TextInput
          id="email"
          inputProps={{
            'data-cy': 'email',
          }}
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
          inputProps={{
            'data-cy': 'password',
          }}
          fullWidth={true}
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={saveToState}
        />
        <div
          style={{
            padding: '16px 0',
          }}>
          <ReCAPTCHA
            data-cy="signin-recaptcha-component"
            ref={recaptchaRef}
            sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
            onChange={token => {
              setState({
                ...state,
                captchaToken: token,
              });
            }}
          />
        </div>

        <ButtonLoader
          type="submit"
          data-cy="submit-login"
          // variant="filled"
          loading={loading}
          text="Sign in"
          successText="Logged In"
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

export default Signin;
