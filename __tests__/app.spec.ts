import request from 'supertest';
import server, { io } from '../app/index';

const userEmail = 'eric.salarie-1@ssdp.net';
const userPassword = '1234';

// test des deux scénarios de connexion (OK ou pas)

beforeAll(async () => {
  await new Promise(resolve => {
    server.on('dbinit', () => {
      console.log('db initialized at ' + new Date().getTime());
      resolve();
    });
  });
}, 120000);

afterAll(done => {
  server.close(() => {
    io.close();
    done();
  });
}, 15000);

describe('POST /login', () => {
  // credentials OK
  it('responds with 200 status', done => {
    request(server)
      .post('/api/login')
      .send({ email: userEmail, password: userPassword })
      .expect(200, done);
  });
  // credentials non OK
  it('responds with 400 status', done => {
    request(server)
      .post('/api/login')
      .send({ email: null, password: null })
      .expect(400, done);
  });
});
