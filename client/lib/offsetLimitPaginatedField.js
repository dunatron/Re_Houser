/**
 * Pagination policies can be tricky to get right,
 * but the same approach works no matter how fancy you get: cursors, deduplication, sorting, merging etc
 */
const offsetLimitPaginatedField = () => {
  return {
    keyArgs: false,
    merge(existing, incoming, { args }) {
      const merged = existsing ? existing.slice(0) : [];
      for (let i = args.offset; i < args.offset + args.limit; i++) {
        merged[i] = incoming[i - args.offset];
      }
      return merged;
    },
    read(existsing, { args }) {
      return existsing && existing.slice(args.offset, args.offset + args.limit);
    },
  };
};

export { offsetLimitPaginatedField };
export default offsetLimitPaginatedField;
