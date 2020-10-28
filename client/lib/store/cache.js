// export default cache;
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import paginationField from './paginationField';
import gql from 'graphql-tag';

//https://www.youtube.com/watch?v=ou0fEW1eRjc&t=1079s
const CacheWrapper = ({ initialState }) => {
  const cache = new InMemoryCache({
    freezeResults: true,
    typePolicies: {
      Query: {
        fields: {
          allItems: paginationField(),
          // firstAndLastName: {
          //   read: (existing, { readField }) => {
          //     const firstName = readField('firstName');
          //     const lastName = readField('lastName');
          //   },
          // },
          User: {
            fields: {
              firstAndLastName: {
                read: (exisiting, { readField }) => {
                  // const user = readField('user')
                  return 'COOOOOL';
                },
                merge(existing, incoming, { args }) {
                  return 'lol';
                },
              },
            },
          },
          // me: {
          //   keyArgs: false, // take full control of this field
          //   read(existing = {}, { args, readField }) {
          //     // return existing;
          //     return {
          //       ...existing,
          //       boooo: 'yessss',
          //     };
          //   },
          // },
        },
      },
    },
  }).restore(initialState || {});

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
