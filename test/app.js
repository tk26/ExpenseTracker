const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /random-url', () => {
  it('should return 404', (done) => {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});

describe('GET /logout', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/logout')
      .expect(302, done);
  });
});

describe('GET /account', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/account')
      .expect(302, done);
  });
});

describe('GET /expenses', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/expenses')
      .expect(302, done);
  });
});

describe('GET /expense', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/expense')
      .expect(302, done);
  });
});