import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import ContactForm from '@/Components/Contact/ContactForm';
import { useQuery } from '@apollo/client';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const ContactPage = props => {
  console.log('props on contact page => ', props);

  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) return <div>AN Error</div>;

  return (
    <>
      <PageHeader
        title="Contact"
        id="contact-page"
        metaData={{
          title: 'Contact Rehouser Support',
          content:
            'Contact the rehouser support team who will be in touch with you promptly',
        }}
      />
      <ContactForm />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {},
  });
}

export default ContactPage;
