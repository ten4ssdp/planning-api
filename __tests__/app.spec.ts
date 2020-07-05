import request from 'supertest';
import server from '../app/index';

const userEmail = 'eric.salarie-1@ssdp.net';
const userPassword = '1234';

// test des deux scénarios de connexion (OK ou pas)

afterAll(() => {
  server.close();
});

describe('POST /login', () => {
  // credentials OK
  it('responds with 200 status', async done => {
    request(server)
      .get('/api/login')
      .send({ email: userEmail, password: userPassword })
      .expect(200, done);
  });
  // credentials non OK
  it('responds with 400 status', async done => {
    request(server)
      .get('/api/login')
      .send({ email: null, password: null })
      .expect(400, done);
  });
});
