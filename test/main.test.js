const chai = require("chai");
const sinon = require("sinon");
const axios = require("../utils/axios");
const { updateIfExists } = require("../src/main");

const expect = chai.expect;
chai.use(require("sinon-chai"));

describe("Assignment", () => {
  beforeEach(() => {
    axios.get = sinon.stub(axios, "get").callsFake((url) => {
      if (url.includes("error")) {
        const message = "Request failed with status code 404";
        return Promise.reject(new Error(message));
      }
      return Promise.resolve();
    });
    axios.put = sinon.stub(axios, "put");
  });

  afterEach(() => {
    axios.get.restore();
    axios.put.restore();
  });

  describe("updateIfExists()", () => {
    const data = {
      id: "dFBbdkr",
      name: "Vela",
      meaning: "Sails",
      starsWithPlanets: 7,
      quadrant: "SQ2",
    };

    beforeEach(() => {
      axios.put.returns(Promise.resolve({ data }));
    });

    it("should check if the constellation exists and update it if it does", async () => {
      const actual = await updateIfExists(data.id, data);
      expect(actual).to.equal(data);
    });

    it("should return the error message if there is one", async () => {
      const actual = await updateIfExists("error", data);
      expect(actual).to.include("404");
    });
  });

  describe("Implementation", () => {
    it("should not use console.log()", async () => {
      expect(updateIfExists.toString()).not.to.include("console.log(");
    });
  });
});