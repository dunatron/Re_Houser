import { DataProxy } from 'apollo-cache';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import * as fragments from '../graphql/fragments';
import * as queries from '../graphql/queries';

export const writeMessage = (client, message) => {};

export const writeChat = (client, chat) => {};
