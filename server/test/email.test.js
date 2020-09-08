/**
 * https://github.com/prisma-labs/graphql-yoga/issues/616
 */
require("dotenv").config({ path: "./variables.env" });

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const signupEmail = require("../src/lib/emails/signupEmail");
const emailCEO = require("../src/lib/emails/emailCEO");

describe("Emails", function() {
  // Signup Email
  describe("signupEmail", function() {
    it("should return maybe a success if we await it", async function() {
      this.timeout(5000); // wait 5s
      await signupEmail({
        toEmail: "heath.dunlop.hd@gmail.com",
        ctx: null,
        user: null,
        confirmEmailToken: ""
      });
    });
  });

  // email CEO
  describe("Can email CEO", function() {
    it("Should not fail if we can email the CEO", async function() {
      this.timeout(5000); // wait 5s
      await emailCEO({
        ctx: null,
        subject: "Test email CEO",
        body:
          "This email was sent from the rehouser test suite. asserting the email CEO function works"
      });
    });
  });
});
