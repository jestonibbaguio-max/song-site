const assert = require('node:assert/strict');
const { test, before, after } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'song-site-default-session-'));
process.env.DB_DRIVER = 'sqlite';
process.env.DATABASE_PATH = path.join(directory, 'server.sqlite');
process.env.AUTH_MODE = 'development';
process.env.NODE_ENV = 'test';
process.env.DEV_SESSION_SECRET = 'default-session-test-secret-at-least-32-characters';
process.env.DEV_DEFAULT_FIXTURE = 'administrator';
process.env.DEV_DEFAULT_EMAIL = 'admin@example.test';
process.env.DEV_ALLOWED_ORIGINS = 'http://localhost:4200';
process.env.HOST = '127.0.0.1';

const { app, database } = require('./server');
let server;
let baseUrl;

async function request(method, url, body, cookie, csrf) {
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      'content-type': 'application/json',
      origin: 'http://localhost:4200',
      ...(cookie ? { cookie } : {}),
      ...(csrf ? { 'x-csrf-token': csrf } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return {
    response,
    json: response.status === 204 ? null : await response.json(),
    cookie: response.headers.get('set-cookie'),
  };
}

before(async () => {
  server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise(resolve => server.close(resolve));
  database.close();
  fs.rmSync(directory, { recursive: true, force: true });
});

test('configured local administrator is established by the backend without a role selector', async () => {
  const session = await request('GET', '/api/v1/session');
  assert.equal(session.response.status, 200);
  assert.equal(session.json.authenticated, true);
  assert.equal(session.json.identity.role, 'administrator');
  assert.equal(session.json.identity.email, 'admin@example.test');
  assert.match(session.cookie, /HttpOnly/);
  assert.match(session.cookie, /SameSite=Strict/);

  const cookie = session.cookie.split(';')[0];
  const users = await request('GET', '/api/v1/rbac/users', undefined, cookie);
  assert.equal(users.response.status, 200);

  const deniedUpdate = await request('PUT', '/api/v1/users/dev-author', { displayName: 'Temporary' }, cookie);
  assert.equal(deniedUpdate.response.status, 403);

  const signedOut = await request('DELETE', '/api/v1/dev/session', undefined, cookie);
  assert.equal(signedOut.response.status, 204);
  const signedOutCookie = signedOut.cookie.split(';')[0];
  const signInPageSession = await request('GET', '/api/v1/session', undefined, signedOutCookie);
  assert.equal(signInPageSession.response.status, 200);
  assert.equal(signInPageSession.json.authenticated, false);

  const signedInAgain = await request('POST', '/api/v1/dev/session', { fixture: 'administrator' }, signedOutCookie);
  assert.equal(signedInAgain.response.status, 200);
  assert.equal(signedInAgain.json.authenticated, true);
});
