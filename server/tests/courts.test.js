const axios = require('axios');
const axiosConfig = require('../config/axios-config');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  const atlasConnection = process.env.DB_CONNECTION_ATLAS;
  await mongoose.connect(atlasConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET@/api/courts', () => {
  it('should return courts with first court in table equal to defaultCourt object and status 200', async () => {
    // arrange
    const defaultCourt = {
      _id: '600b19475c285f3324b584a6',
      ids: 'Boisko główne',
      nameCourt: 'D',
      description: 'Całe Boisko',
      date: [
        { _id: '600b19475c285f3324b584a7', nameOfDay: 'Mon', value: false },
        { _id: '600b19475c285f3324b584a8', nameOfDay: 'Tue', value: false },
        { _id: '600b19475c285f3324b584a9', nameOfDay: 'Wed', value: false },
        { _id: '600b19475c285f3324b584aa', nameOfDay: 'Thu', value: false },
        { _id: '600b19475c285f3324b584ab', nameOfDay: 'Fri', value: false },
        { _id: '600b19475c285f3324b584ac', nameOfDay: 'Sat', value: true },
        { _id: '600b19475c285f3324b584ad', nameOfDay: 'Sun', value: true },
      ],
      sessionTime: '90',
      tariffId: '600b19475c285f3324b584a5',
      __v: 0,
    };

    // act
    const result = await axios.get(`http://localhost:3001/api/courts`, {
      axiosConfig,
    });

    // asserts
    expect(result.status).toEqual(200);
    expect(result.data[0]).toMatchObject(defaultCourt);
  });
});
