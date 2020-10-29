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
