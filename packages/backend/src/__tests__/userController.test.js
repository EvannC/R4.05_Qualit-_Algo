const mockDb = {
  run: jest.fn(),
  get: jest.fn(),
  all: jest.fn()
};

jest.mock('../db/database', () => ({
  getDb: () => mockDb
}));

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(() => 'HASHED'),
  compareSync: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'TOKEN')
}));

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');

const mockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe('userController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registerUser -> 201 + token si ok', () => {
    mockDb.run.mockImplementation(function (sql, params, cb) {
      this.lastID = 7;
      cb(null);
    });

    const req = { body: { username: 'u', password: 'p', firstname: 'f', lastname: 'l' } };
    const res = mockRes();

    userController.registerUser(req, res);

    expect(bcrypt.hashSync).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ auth: true, token: 'TOKEN' });
  });

  test('loginUser -> 404 si user absent', () => {
    mockDb.get.mockImplementation((sql, params, cb) => cb(null, undefined));
    bcrypt.compareSync.mockReturnValue(true);

    const req = { body: { username: 'u', password: 'p' } };
    const res = mockRes();

    userController.loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('getAllUsers -> 200', () => {
    mockDb.all.mockImplementation((sql, params, cb) => cb(null, [{ id: 1, username: 'u' }]));

    const req = {};
    const res = mockRes();

    userController.getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, username: 'u' }]);
  });

  test('findSimilarUsernames -> ok', () => {
    mockDb.all.mockImplementation((sql, params, cb) =>
      cb(null, [{ username: 'john' }, { username: 'jon' }, { username: 'alice' }])
    );

    const req = {};
    const res = mockRes();

    userController.findSimilarUsernames(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
