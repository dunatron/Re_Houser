/**
 * Pagination policies can be tricky to get right,
 * but the same approach works no matter how fancy you get: cursors, deduplication, sorting, merging etc
 */
const offsetLimitPaginatedField = () => {
  return {
    keyArgs: false,
    merge(existing, incoming, { args }) {
      return null;
      const merged = [];
      for (let i = args.offset; i < args.offset + args.limit; i++) {
        merged[i] = incoming[i - args.offset];
      }
      return merged;
    },
    // read(existsing, { args }) {
    //   return existsing && existing.slice(args.offset, args.offset + args.limit);
    // },
  };
};

const connectionPaginationField = () => {
  return {
    keyArgs: false,
    merge(existing, reference, other) {
      const newEdges = reference.edges;
      const pageInfo = reference.pageInfo;
      return reference;
      // return newEdges.length
      //   ? {
      //       messagesConnection: {
      //         __typename: reference.__typename,
      //         edges: [...newEdges, ...existing.edges],
      //         pageInfo,
      //       },
      //     }
      //   : existing;
    },
    // read(existsing, { args }) {
    //   return existsing && existing.slice(args.offset, args.offset + args.limit);
    // },
  };
};

export { offsetLimitPaginatedField, connectionPaginationField };
export default offsetLimitPaginatedField;
