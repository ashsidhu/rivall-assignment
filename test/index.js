import http from "http";
import assert from "assert";

import "../src/index.js";

describe("Example Node Server", () => {
  it("should return 404 on root url", done => {
    http.get(`${process.env.HOST}:${process.env.PORT}`, res => {
      assert.equal(404, res.statusCode);
      done();
    });
  });
  it('should return 404 on "/invalid" url', done => {
    http.get(`${process.env.HOST}:${process.env.PORT}/invalid`, res => {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});
