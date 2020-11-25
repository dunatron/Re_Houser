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

// export async function getServerSideProps(context) {
//   const apolloClient = initializeApollo();
//   const { me } = await apolloClient.query({
//     query: CURRENT_USER_QUERY,
//   });

//   console.log('Me from this shit => ', me);

//   return addApolloState(apolloClient, {
//     props: {},
//     revalidate: 1,
//   });
// }

// export async function getServerSideProps() {
//   // Call an external API endpoint to get posts
//   // const res = await fetch('https://.../posts');
//   // const posts = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       dunatron: 'A TRON TEST',
//     },
//   };
// }

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: CURRENT_USER_QUERY,
//   });

//   return addApolloState(apolloClient, {
//     props: {},
//     revalidate: 1,
//   });
// }

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
