const jwt = require('jsonwebtoken');
const request = require('supertest');

const SECRET = 'your-super-secret-key-that-should-not-be-hardcoded';

describe('API integration', () => {
  let app;
  let token;
  let createApp;

  // IMPORTANT: db/testDb doivent être require APRES resetModules
  let db;
  let setupTestDb;
  let teardownTestDb;

  beforeAll(async () => {
    jest.resetModules();

    db = require('../db/database');
    ({ setupTestDb, teardownTestDb } = require('./testDb'));

    await setupTestDb();
    await db.connect();

    ({ createApp } = require('../server'));

    app = createApp();
    token = jwt.sign({ id: 1 }, SECRET, { expiresIn: 86400 });
  });

  afterAll(async () => {
    await teardownTestDb();
    await db.closeConnection();
  });

  test('GET /api/products -> 401 sans auth', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(401);
  });

  test('GET /api/products -> 200 avec auth', async () => {
    const res = await request(app).get('/api/products').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/products -> 201 crée un produit', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Product', price: 12.34, stock: 5 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Product');
  });

  test('PATCH /api/products/:id/stock -> 404 si produit inexistant', async () => {
    const res = await request(app)
      .patch('/api/products/999999/stock')
      .set('Authorization', `Bearer ${token}`)
      .send({ stock: 10 });

    expect(res.status).toBe(404);
  });
});
