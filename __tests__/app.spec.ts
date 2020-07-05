import request from 'supertest';
import server from '../app/index';

const userEmail = 'eric.salarie-1@ssdp.net';
const userPassword = '1234';

// test des deux scénarios de connexion (OK ou pas)

afterAll(done => {
  server.close(done);
});

beforeAll(done => {
  return new Promise(resolve => {
    server.on('dbinit', () => {
      console.log('dbinit');
      resolve(() => done());
    });
  });
});

describe('POST /login', () => {
  // credentials OK
  it('responds with 200 status', done => {
    request(server)
      .post('/api/login')
      .send({ email: userEmail, password: userPassword })
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  // credentials non OK
  it('responds with 400 status', done => {
    request(server)
      .post('/api/login')
      .send({ email: null, password: null })
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});
