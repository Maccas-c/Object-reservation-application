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

describe('GET@/api/reservations/:userId', () => {
  it('should return reservations sorted by given userId, match first in table and status 200', async () => {
    // arrange
    const userId = '600abdccdc1fd518d1b84cc6';
    const defaultReservations = {
      vat: true,
      isServedVat: false,
      paid: true,
      email_sent: false,
      id: '600c395bd6d5c328a85143c0',
      title: '16:30',
      start: '2021-01-23T16:30:00.595Z',
      dayString: '2021-01-23',
      end: '2021-01-23T18:00:00.595Z',
      courtId: {
        id: '600b19475c285f3324b584a6',
        ids: 'Boisko główne',
        nameCourt: 'D',
        description: 'Całe Boisko',
        date: [
          {
            id: '600b19475c285f3324b584a7',
            nameOfDay: 'Mon',
            value: false,
          },
          {
            id: '600b19475c285f3324b584a8',
            nameOfDay: 'Tue',
            value: false,
          },
          {
            id: '600b19475c285f3324b584a9',
            nameOfDay: 'Wed',
            value: false,
          },
          {
            id: '600b19475c285f3324b584aa',
            nameOfDay: 'Thu',
            value: false,
          },
          {
            id: '600b19475c285f3324b584ab',
            nameOfDay: 'Fri',
            value: false,
          },
          {
            id: '600b19475c285f3324b584ac',
            nameOfDay: 'Sat',
            value: true,
          },
          {
            id: '600b19475c285f3324b584ad',
            nameOfDay: 'Sun',
            value: true,
          },
        ],
        sessionTime: '90',
        tariffId: '600b19475c285f3324b584a5',
        __v: 0,
      },
      userId: '600abdccdc1fd518d1b84cc6',
      price: 10,
      __v: 0,
      orderId: 'WZSX6VBDZZ210123GUEST000P01',
    };

    // act
    const result = await axios.get(
      `http://localhost:3001/api/reservations/${userId}`,
      {
        axiosConfig,
      },
    );

    // asserts
    expect(result.status).toEqual(200);
    expect(result.data[0]).toMatchObject(defaultReservations);
  });
});

describe('POST@/api/reservationsDate', () => {
  it('should return free time in given day and status 200', async () => {
    // arrange
    const day = { date: '2021-01-24T22:59:59.000Z', nameCourt: 'D' };
    const freeTimes = [
      { hour: '15:00', durationTime: '15:00-16:30', free: true },
      { hour: '16:30', durationTime: '16:30-18:00', free: true },
      { hour: '18:00', durationTime: '18:00-19:30', free: true },
      { hour: '19:30', durationTime: '19:30-21:00', free: true },
      { hour: '21:00', durationTime: '21:00-22:30', free: true },
    ];

    // act
    const result = await axios.post(
      `http://localhost:3001/api/reservationsDate`,
      { date: day },
      {
        axiosConfig,
      },
    );

    // asserts
    expect(result.status).toEqual(200);
    expect(result.data).toMatchObject(freeTimes);
  });
});

describe('POST@/api/reservation/addToBasket', () => {
  it('should add reservation to basket return it and status 201', async () => {
    // arrange
    const reservation = {
      activity: 'classes_and_sports_training',
      courtId: '600b19475c285f3324b584a6',
      duration: '90',
      nameCourt: 'D',
      start: '2021-01-31T20:00:00.595Z',
      userId: '600abdccdc1fd518d1b84cc6',
      vat: true,
    };

    // act
    const result = await axios.post(
      `http://localhost:3001/api/reservation/addToBasket`,
      reservation,
      {
        axiosConfig,
      },
    );

    // asserts
    expect(result.status).toEqual(201);
    expect(result.data).toBeDefined();
  });
});
