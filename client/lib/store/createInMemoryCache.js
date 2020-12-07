// export default cache;
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import {
  concatPagination,
  offsetLimitPagination,
  relayStylePagination,
} from '@apollo/client/utilities';
import paginationField from './paginationField';
import gql from 'graphql-tag';

//https://www.youtube.com/watch?v=ou0fEW1eRjc&t=1079s
//https://www.youtube.com/watch?v=ou0fEW1eRjc&t=1079s 42:45 for modify cache
// read this https://www.apollographql.com/blog/first-impressions-with-apollo-client-3-2ae2a069ab2f/
const CacheWrapper = () => {
  const cache = new InMemoryCache({
    freezeResults: true,
    typePolicies: {
      // Query: {
      //   fields: {
      //     allItems: paginationField(),
      //   },
      // },
      Query: {
        fields: {
          // ownerProperties: relayStylePagination(),
          // ownerProperties: offsetLimitPagination(),
          // ownerProperties: paginationField(),
          ownerProperties: {
            merge(existing = [], incoming) {
              console.log('cache properties existing => ', existing);
              console.log('cache properties incoming => ', incoming);
              const mergedProperties = [...existing, ...incoming];
              console.log('cache properties merged => ', mergedProperties);
              // return [];
              return [...existing, ...incoming];
            },
          },
        },
      },
      User: {
        fields: {
          isAdmin: {
            read: (exisiting, toolBag) => {
              const permissions = toolBag.readField('permissions');
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
