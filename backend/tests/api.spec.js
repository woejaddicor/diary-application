require("dotenv").config();
const request = require("supertest");
const api = require("../api");
const User = require("../models/User");
const Complaint = require ("../models/Complaint");

describe("Complaint test", () => {

    let api2;
    beforeAll(async () => {
        api2 = api.listen(5005, () => {
            console.log("test running");
        });
    });
    beforeEach(async () => {
    });

    // afterAll(async (done) => {
    //     // api2.close(done);
    // });

    it("responds with status code 200 for GET requests to /", async () => {
        const response = await request(api2).get("/");
        expect(response.statusCode).toBe(200);
    });

    it("responds with status code 200 for GET requests to /complaint/5", async () => {
        const response = await request(api2).get("/complaint/5");
        expect(response.statusCode).toBe(200);
    });

    it("responds with status code 404 for GET requests to invalid URL", async () => {
        const response = await request(api2).get("/invalid");
        expect(response.statusCode).toBe(404);
    });
    it("responds with status code 404 for GET requests to invalid id", async () => {
        const response = await request(api2).get("/complaint/5000");
        expect(response.statusCode).toBe(404);
    });
    it("responds with status code 400 for POST requests to /complaint with invalid data", async () => {
        const response = await request(api2)
            .post("/complaint")
            .send({
                "bad":15
            });
        expect(response.statusCode).toBe(400);
    });
});
