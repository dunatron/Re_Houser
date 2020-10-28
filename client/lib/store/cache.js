// export default cache;
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import paginationField from './paginationField';
import gql from 'graphql-tag';

//https://www.youtube.com/watch?v=ou0fEW1eRjc&t=1079s
//https://www.youtube.com/watch?v=ou0fEW1eRjc&t=1079s 42:45 for modify cache
// read this https://www.apollographql.com/blog/first-impressions-with-apollo-client-3-2ae2a069ab2f/
const CacheWrapper = ({ initialState }) => {
  const cache = new InMemoryCache({
    freezeResults: true,
    typePolicies: {
      Query: {
        fields: {
          allItems: paginationField(),
        },
      },
      User: {
        fields: {
          isAdmin: {
            read: (exisiting, toolBag) => {
              const permissions = toolBag.readField('permissions');
              console.log('permissions in read isAdmin field => ', permissions);
              if (!permissions) return false;
              return permissions.includes('ADMIN');
            },
          },
          isWizard: {
            read: (exisiting, toolBag) => {
              const permissions = toolBag.readField('permissions');
              if (!permissions) return false;
              return permissions.includes('WIZARD');
            },
          },
        },
      },
    },
  });

  cache.writeQuery({
    query: gql`
      {
        openChats
      }
    `,
    data: {
      openChats: [],
    },
  });

  return cache;
};

export default CacheWrapper;

// // export default cache;
// import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
// import paginationField from './paginationField';
// import gql from 'graphql-tag';

// //https://www.youtube.com/watch?v=ou0fEW1eRjc&t=1079s
// //https://www.youtube.com/watch?v=ou0fEW1eRjc&t=1079s 42:45 for modify cache
// const CacheWrapper = ({ initialState }) => {
//   console.log('HELP: HERE IS THE CACHE');
//   const cache = new InMemoryCache({
//     freezeResults: true,
//     typePolicies: {
//       Query: {
//         Property: {
//           fields: {
//             location: {
//               read: (exisiting, { readField }) => {
//                 console.log('HELP: ');
//                 // const user = readField('user')
//                 return exisiting;
//                 // return exisiting;
//               },
//             },
//           },
//         },
//         fields: {
//           // allItems: paginationField(),
//           // firstAndLastName: {
//           //   read: (existing, { readField }) => {
//           //     const firstName = readField('firstName');
//           //     const lastName = readField('lastName');
//           //   },
//           // },
//           Property: {
//             fields: {
//               location: {
//                 read: (exisiting, { readField }) => {
//                   console.log('HELP: ');
//                   // const user = readField('user')
//                   return exisiting;
//                   // return exisiting;
//                 },
//               },
//             },
//           },
//           User: {
//             fields: {
//               firstName: {
//                 read: (exisiting, { readField }) => {
//                   // const user = readField('user')
//                   return exisiting;
//                 },
//                 merge(existing, incoming, { args }) {
//                   return exisiting;
//                 },
//               },
//               firstAndLastName: {
//                 read: (exisiting, { readField }) => {
//                   // const user = readField('user')
//                   return 'COOOOOL';
//                 },
//                 merge(existing, incoming, { args }) {
//                   return 'lol';
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   }).restore(initialState || {});

//   cache.writeQuery({
//     query: gql`
//       {
//         openChats
//       }
//     `,
//     data: {
//       openChats: [],
//     },
//   });

//   return cache;
// };

// export default CacheWrapper;
