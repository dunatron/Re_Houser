async function hello(parent, args, ctx, info) {
  console.log(`3 -> Call resolver: hello`);
  //   return `Hello ${args.name ? args.name : "world"}!`;
  return {
    __typename: "User",
    id: "testUserID",
    firstName: "tron"
  };
}

module.exports = hello;
