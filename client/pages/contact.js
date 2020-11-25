import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import ContactForm from '@/Components/Contact/ContactForm';
import { CURRENT_USER_QUERY } from '@/Gql/queries';
import { useQuery } from '@apollo/client';

import { initializeApollo, addApolloState } from '../lib/apolloClient';

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

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

// ContactPage.getInitialProps = async props => {
//   const {
//     err,
//     req,
//     res,
//     pathname,
//     query,
//     asPath,
//     AppTree,
//     apolloClient,
//   } = props;
//   console.log('ahh props omn contatc page => ', props);
//   // const apolloClient = apollo;

//   await apolloClient.query({
//     query: CURRENT_USER_QUERY,
//   });
//   return {
//     props: {
//       // initialApolloState: apolloClient.cache.extract(),
//       test: 'this is a test',
//     },
//   };
// };

export default ContactPage;
