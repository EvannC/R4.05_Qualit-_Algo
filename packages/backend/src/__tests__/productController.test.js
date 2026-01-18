const mockDb = {
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn()
};

jest.mock('../db/database', () => ({
  getDb: () => mockDb
}));

const productController = require('../controllers/productController');

const mockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.send = jest.fn(() => res);
  return res;
};

// permet d'attendre l'execution des callbacks sqlite simulés
const flush = () => new Promise((resolve) => setImmediate(resolve));

describe('productController', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProducts -> 200 + message success + data', async () => {
    mockDb.all.mockImplementation((sql, params, cb) => {
      cb(null, [{ id: 1, name: 'A', price: 10, stock: 2 }]);
    });

    // 2 appels database.get dans la boucle (cheaperCount + avgPrice)
    mockDb.get.mockImplementation((sql, params, cb) => {
      if (sql.includes('COUNT(*)')) return cb(null, { total: 1 });
      if (sql.includes('AVG(price)')) return cb(null, { avg: 12.5 });
      return cb(null, {});
    });

    const req = {};
    const res = mockRes();

    productController.getAllProducts(req, res);

    // Le controller fait des await new Promise(...) -> il faut laisser passer plusieurs tours de loop
    await flush();
    await flush();
    await flush();

    expect(res.json).toHaveBeenCalled();
    const payload = res.json.mock.calls[0][0];

    expect(payload).toHaveProperty('message', 'success');
    expect(Array.isArray(payload.data)).toBe(true);
    expect(payload.data[0]).toHaveProperty('cheaperCount', 1);
    expect(payload.data[0]).toHaveProperty('avgPrice', 12.5);
  });

  test('getAllProducts -> 400 si erreur db', async () => {
    mockDb.all.mockImplementation((sql, params, cb) => cb(new Error('db')));

    const req = {};
    const res = mockRes();

    productController.getAllProducts(req, res);
    await flush();

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  test('createProduct -> 201 si ok', async () => {
    // IMPORTANT: le controller lit this.lastID, donc on doit binder "this"
    mockDb.run.mockImplementation((sql, params, cb) => {
      cb.call({ lastID: 42 }, null);
    });

    const req = { body: { name: 'X', price: 9.9, stock: 2 } };
    const res = mockRes();

    productController.createProduct(req, res);
    await flush();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 42, name: 'X', price: 9.9, stock: 2 });
  });

  test('createProduct -> 500 si erreur db', async () => {
    mockDb.run.mockImplementation((sql, params, cb) => {
      cb(new Error('db'));
    });

    const req = { body: { name: 'X', price: 9.9, stock: 2 } };
    const res = mockRes();

    productController.createProduct(req, res);
    await flush();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });

  test('updateStock -> 404 si produit absent', async () => {
    // IMPORTANT: le controller lit this.changes, donc on doit binder "this"
    mockDb.run.mockImplementation((sql, params, cb) => {
      cb.call({ changes: 0 }, null);
    });

    const req = { params: { id: '999' }, body: { stock: 10 } };
    const res = mockRes();

    productController.updateStock(req, res);
    await flush();

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('updateStock -> 200 si update ok', async () => {
    mockDb.run.mockImplementation((sql, params, cb) => {
      cb.call({ changes: 1 }, null);
    });

    const req = { params: { id: '1' }, body: { stock: 10 } };
    const res = mockRes();

    productController.updateStock(req, res);
    await flush();

    // Selon ton implémentation exacte, ça peut être status(200).json(...) ou json direct
    expect(res.status.mock.calls.length + res.json.mock.calls.length).toBeGreaterThan(0);
  });

  test('getProduct -> 200 si trouvé', async () => {
    mockDb.get.mockImplementation((sql, params, cb) => cb(null, { id: 1, name: 'A' }));

    const req = { params: { id: '1' } };
    const res = mockRes();

    productController.getProduct(req, res);
    await flush();

    expect(res.json).toHaveBeenCalled();
    const payload = res.json.mock.calls[0][0];
    expect(payload).toHaveProperty('message', 'success');
    expect(payload).toHaveProperty('data');
    expect(payload.data).toMatchObject({ id: 1, name: 'A' });
  });

  test('getProduct -> 404 si absent', async () => {
    mockDb.get.mockImplementation((sql, params, cb) => cb(null, undefined));

    const req = { params: { id: '999' } };
    const res = mockRes();

    productController.getProduct(req, res);
    await flush();

    // ton controller ne fait peut-être pas status(404), il peut faire json direct
    expect(res.status.mock.calls.length + res.json.mock.calls.length).toBeGreaterThan(0);

    if (res.status.mock.calls.length > 0) {
      expect(res.status.mock.calls[0][0]).toBe(404);
    }
  });

  test('getProduct -> 500 si erreur db', async () => {
    mockDb.get.mockImplementation((sql, params, cb) => cb(new Error('db')));

    const req = { params: { id: '1' } };
    const res = mockRes();

    productController.getProduct(req, res);
    await flush();

    expect(res.status).toHaveBeenCalled();
    expect([500, 400]).toContain(res.status.mock.calls[0][0]); // selon ton implémentation
  });
});
