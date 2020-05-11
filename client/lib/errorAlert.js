import { toast } from 'react-toastify';

const errorAlert = error => {
  if (error) {
    if (error.message) {
      toast.error(
        <p data-test="graphql-error">
          <strong>Shoot! </strong>
          <br />
          {error.message.replace('GraphQL error: ', '')}
        </p>
      );
    }
  }
};

export default errorAlert;
