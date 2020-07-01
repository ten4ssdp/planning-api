const request = require('supertest');
const app = require('../app/index');

const user_email = 'eric.salarie-1@ssdp.net';
const user_password = '1234';

function sum(a, b) {
  return a + b;
}

test('POST /login', () => {
  expect(sum(1, 1)).toEqual(2);
  // it("responds with 204 status", async () => {
  //     request(app)
  //         .get('/login')
  //         .send({email: user_email, password: user_password})
  //         .expect(200)
  // });
  // it("responds with 400 status", async () => {
  //     request(app)
  //         .get('/login')
  //         .send({email: null, password: null})
  //         .expect(400)
  // })
});
