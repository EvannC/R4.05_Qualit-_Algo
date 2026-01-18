const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const SECRET = 'your-super-secret-key-that-should-not-be-hardcoded';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  console.error.mockRestore();
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

test('auth -> 401 si pas de token', () => {
  const req = { headers: {} };
  const res = mockRes();
  const next = jest.fn();

  auth(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
});

test('auth -> 401 si token invalide', () => {
  const req = { headers: { authorization: 'Bearer invalid' } };
  const res = mockRes();
  const next = jest.fn();

  auth(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
});

test('auth -> next() si token valide', () => {
  const token = jwt.sign({ id: 1 }, SECRET);
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = mockRes();
  const next = jest.fn();

  auth(req, res, next);

  expect(next).toHaveBeenCalled();
});
