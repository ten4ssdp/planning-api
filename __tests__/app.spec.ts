
import request from 'supertest';
import app from '../app/index';

const user_email = 'eric.salarie-1@ssdp.net';
const user_password = '1234';

// test des deux scénarios de connexion (OK ou pas)

describe('POST /login', () => {
  // credentials OK
  it('responds with 200 status', async () => {
    request(app)
      .get('/api/login')
      .send({ email: user_email, password: user_password })
      .expect(200);
  });
  // credentials non OK
  it('responds with 400 status', async () => {
    request(app)
      .get('/api/login')
      .send({ email: null, password: null })
      .expect(400);
  });
});