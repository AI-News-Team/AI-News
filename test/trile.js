// const request = require('supertest');
// const app = require('./api')
// // API tests
// describe("POST /add-task", function () {
//   it("Adds a task", function (done) {
//     // Use supertest to run assertions for our API
//     request(app)
//       .post("/add-task")
//       .send({ title: "API testing rocks!" })
//       .expect(201, done);
//   });
// });
// describe("GET /tasks", function () {
//   it("List all tasks", function (done) {
//     request(app).get("/tasks").expect(200, done);
//   });
// });
// describe("GET /tasks/:id", function () {
//   it("Gets a particular task", function (done) {
//     request(app)
//       // Here, you should use the ids generated from the tasks you have in your db
//       .get("/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2")
//       .expect(200, done);
//   });
// });
// describe("PUT /tasks/:id", function () {
//   it("Updates a particular task", function (done) {
//     request(app)
//       .put("/tasks/957095a3-fff0-47a5-9d2f-d64fddbd67e2")
//       .send({ title: "Updated task buoy" })
//       .expect(200, done);
//   });
// });
// describe("DELETE /tasks/:id", function () {
//   it("Deletes a particular task", function (done) {
//     request(app)
//       .delete("/tasks/8e88212c-2a05-4774-a371-9638cc897e52")
//       .expect(200, done);
//   });
// });
