"use strict";

const fs = require("file-system");
const path = require("path");

/**
 * https://github.com/prisma-labs/graphql-yoga/issues/616
 * Awww fuck yea hoe. https://ednsquare.com/story/testing-queries-and-mutations-on-graphql-server------tOlICG
 */

require("dotenv").config({ path: "./variables.env" });

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

var assert = chai.assert; // Using Assert style
var expect = chai.expect; // Using Expect style
var should = chai.should(); // Using Should style

const EasyGraphQLTester = require("easygraphql-tester");

// const schemaCode = fs.readFileSync(
//   path.join(__dirname, "schema", "../src/schema.graphql"),
//   "utf8"
// );

const schemaCode = fs.readFileSync(
  path.join(__dirname, "../src/generated/prisma.graphql"),
  "utf8"
);

describe("Mutation", () => {
  let tester;

  before(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  describe("Should throw an error if variables are missing", () => {
    it("Should throw an error if the variables are missing", () => {
      let error;
      try {
        const mutation = `
          mutation CreateUser{
            createUser {
              email
            }
          }
        `;
        tester.mock(mutation);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.be.eq(
        `Argument "data" of required type "UserCreateInput!" was not provided.`
      );
    });
  });

  describe("Should return selected fields", () => {
    it("Should return selected fields", () => {
      const mutation = `
        mutation CreateUser($data: UserCreateInput!) {
            createUser(data: $data) {
              id
              email
              firstName
              lastName
            }
        }
      `;
      const test = tester.mock(mutation, {
        data: {
          firstName: "test",
          lastName: "test",
          phone: "55555",
          email: "testpwease@test.com",
          password: "test",
          acceptedSignupTerms: true,
          adminSettings: {}
        }
      });

      console.log("Test data res i guess => ", test);

      expect(test.data.createUser).to.exist;
      expect(test.data.createUser.email).to.be.a("string");
    });
  });
});
