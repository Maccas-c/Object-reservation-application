const app = require('../app');
const request = require('supertest');
const axios = require('axios');
const axiosConfig = require('../config/axios-config');

describe('app test', () => {
  it('has a module', () => {
    expect(app).toBeDefined();
  });

  beforeAll(async () => {
    server = app.listen(3002);
  });

  afterAll(() => {
    server.close(done);
  });

  describe('user routes test', () => {
    it('can list users', async () => {
      const users = await axios.get(
        'http://localhost:3001/api/admin/users?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D',
        {
          axiosConfig,
        },
      );

      expect(users.status).toEqual(200);
    });

    it('fails if is missing range in params', async () => {
      await request(server)
        .get('http://localhost:3001/api/admin/users')
        .expect(404);
    });
  });

  describe('reservation routes test', () => {
    it('can list reservations', async () => {
      const reservations = await axios.get(
        'http://localhost:3001/api/admin/reservations?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D',
        {
          axiosConfig,
        },
      );

      expect(reservations.status).toEqual(200);
    });

    it('can show user details', async () => {
      const userId = '600c3bca3ee47a4014f9e1b1';
      const user = await axios.get(
        `http://localhost:3001/api/admin/users/${userId}`,
        {
          axiosConfig,
        },
      );

      expect(user.status).toEqual(200);
    });

    it('fails if is missing range in params', async () => {
      await request(server)
        .get('http://localhost:3001/api/admin/reservations')
        .expect(404);
    });
  });

  describe('court routes test', () => {
    it('can list courts', async () => {
      const courts = await axios.get(
        'http://localhost:3001/api/admin/courts?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D',
        {
          axiosConfig,
        },
      );

      expect(courts.status).toEqual(200);
    });

    it('fails if is missing range in params', async () => {
      await request(server)
        .get('http://localhost:3001/api/admin/courts')
        .expect(404);
    });
  });

  describe('price routes test', () => {
    it('can list prices', async () => {
      const prices = await axios.get(
        'http://localhost:3001/api/admin/priceLists?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D',
        {
          axiosConfig,
        },
      );

      expect(prices.status).toEqual(200);
    });

    it('fails if is missing range in params', async () => {
      await request(server)
        .get('http://localhost:3001/api/admin/prices')
        .expect(404);
    });
  });

  describe('404', () => {
    it('returns 404', async () => {
      await request(server)
        .get('http://localhost:3001/api/admin/fail')
        .expect(404);
    });
  });
});
