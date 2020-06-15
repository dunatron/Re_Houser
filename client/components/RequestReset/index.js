// import React, { Component } from 'react';
// import { Query, Mutation, Subscription } from '@apollo/react-components';
// import gql from 'graphql-tag';
// import Form from '../../styles/Form';
// import Error from '../ErrorMessage/index';
// import FabButton from '../../styles/FabButton';
// import NavigationIcon from '@material-ui/icons/Navigation';
// import TextInput from '../../styles/TextInput';

// const REQUEST_RESET_MUTATION = gql`
//   mutation REQUEST_RESET_MUTATION($email: String!) {
//     requestReset(email: $email) {
//       message
//     }
//   }
// `;

// class RequestReset extends Component {
//   state = {
//     email: '',
//   };
//   saveToState = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   render() {
//     return (
//       <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
//         {(reset, { error, loading, called }) => (
//           <Form
//             method="post"
//             data-test="form"
//             onSubmit={async e => {
//               e.preventDefault();
//               await reset();
//               this.setState({ email: '' });
//             }}>
//             <fieldset disabled={loading} aria-busy={loading}>
//               <Error error={error} />
//               {!error && !loading && called && (
//                 <p>Success! Check your email for a reset link!</p>
//               )}
//               <TextInput
//                 id="email-reset"
//                 label="Email"
//                 fullWidth={true}
//                 type="email"
//                 name="email"
//                 placeholder="email"
//                 value={this.state.email}
//                 onChange={this.saveToState}
//               />

//               <FabButton
//                 type="submit"
//                 variant="extended"
//                 color="primary"
//                 aria-label="Add"
//                 style={{ minWidth: 160 }}>
//                 <NavigationIcon style={{ marginRight: 5 }} />
//                 Request Reset
//               </FabButton>
//             </fieldset>
//           </Form>
//         )}
//       </Mutation>
//     );
//   }
// }

// export default RequestReset;
// export { REQUEST_RESET_MUTATION };

import React, { useState, useEffect } from 'react';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from '../../styles/Form';
import Error from '../ErrorMessage/index';
import FabButton from '../../styles/FabButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import TextInput from '../../styles/TextInput';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = props => {
  const [email, setEmail] = useState(props.email);
  const [resetPassword, { data, loading, error, called, client }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: email,
      },
    }
  );
  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);
  // saveToState = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };
  return (
    <Form
      method="post"
      data-test="form"
      onSubmit={async e => {
        e.preventDefault();
        await resetPassword();
        setEmail('');
      }}>
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className="main-fieldset">
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Check your email for a reset link!</p>
        )}
        <TextInput
          id="email-reset"
          className="input"
          label="Email"
          fullWidth={true}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <FabButton
          type="submit"
          variant="extended"
          color="primary"
          aria-label="Add"
          style={{ minWidth: 160 }}>
          <NavigationIcon style={{ marginRight: 5 }} />
          Request Reset
        </FabButton>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
export { REQUEST_RESET_MUTATION };
