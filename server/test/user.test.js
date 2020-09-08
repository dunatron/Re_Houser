/**
 * https://github.com/prisma-labs/graphql-yoga/issues/616
 */

require("dotenv").config({ path: "./variables.env" });

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

var assert = chai.assert; // Using Assert style
var expect = chai.expect; // Using Expect style
var should = chai.should(); // Using Should style

const appPromise = require("../src/index");
let app = null;

before(async () => {
  app = await appPromise;
});

describe("Users", function() {
  describe("We should be able to query the seeded database for users", function() {
    it("should get users", async () => {
      const res = await chai
        .request(app)
        .post("/")
        .send({ query: "{ users { id, email }}" });
      expect(res).to.have.status(200);
    });
  });
});
