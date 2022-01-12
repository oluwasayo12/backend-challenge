"use strict";

// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our server for the correct routes
const server = require("../server/app");



describe("GET /", () => {
  test("It should return an object with result OK and error as false", async () => {

    const response = await request(server).get("/");

    expect(response.body).toEqual({"error": false, "result": "OK"});
    expect(response.statusCode).toBe(200);
  });
});



describe("GET /calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=", () => {
  test("It should return an object with valid calulus result and error as false", async () => {

    let encodedData = Buffer.from('2 * (23/(3*3))- 23 * (2*3)', 'ascii').toString('base64');

    const response = await request(server).get("/v1/calculus?query="+encodedData);

    expect(response.body).toEqual({"error": false, "result": -132.88888888888889});
    expect(response.statusCode).toBe(200);
  });
});


describe("GET /calculus?query=[input]", () => {
  test("It should return an object with valid calulus result and error as false", async () => {

    let encodedData = Buffer.from('9*9', 'ascii').toString('base64');

    const response = await request(server).get("/v1/calculus?query="+encodedData);

    expect(response.body).toEqual({"error": false, "result": 81});
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /calculus?query=[input]", () => {
  test("It should return error as true and message with the supported operators", async () => {

    let encodedData = Buffer.from('helloworld', 'ascii').toString('base64');

    const response = await request(server).get("/v1/calculus?query="+encodedData);

    expect(response.body).toEqual({"error": true, "message": "Only () + - / * and numbers are supported"});
    expect(response.statusCode).toBe(422);
  });
});

describe("GET /calculus?query=[input]", () => {
  test("It should return error as true. testing an internal server error response ", async () => {

    let encodedData = Buffer.from('+ - * / ( )', 'ascii').toString('base64');

    const response = await request(server).get("/v1/calculus?query="+encodedData);

    expect(response.body).toEqual({"error": true, "message": "Value expected (char 5)"});
    expect(response.statusCode).toBe(500);
  });
});

