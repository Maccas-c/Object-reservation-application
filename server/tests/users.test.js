const axios = require('axios');
const axiosConfig = require('../config/axios-config');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const _ = require('lodash');
require('dotenv').config();

const userId = '600abdccdc1fd518d1b84cc6';

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

describe('GET@/api/getUser/:userId', () => {
  it('should return an user with given id and status 200', async () => {
    // arrange
    const user = await userModel.findById('600abdccdc1fd518d1b84cc6');
    const userParsed = JSON.parse(JSON.stringify(user));
    delete userParsed['createDate'];

    // act
    const result = await axios.get(
      `http://localhost:3001/api/getUser/${userId}`,
      { axiosConfig },
    );
    delete result.data['createDate'];

    // asserts
    expect(result.status).toEqual(200);
    expect(result.data).toMatchObject(userParsed);
  });
});

describe('DELETE@/api/user/delete/:userId', () => {
  it('should return an user with changed isActive to false and status 200', async () => {
    // arrange

    // act
    const result = await axios.patch(
      `http://localhost:3001/api/user/delete/${userId}`,
      { axiosConfig },
    );

    // asserts
    expect(result.status).toEqual(200);
    expect(result.data.isActive).toBe(false);
  });
});

describe('UPDATE@/api/user/update', () => {
  it('should return an user with updated data and status 200', async () => {
    // arrange
    const userDb = await userModel.findById('600b3c799d038b369979f4a7');
    const userToParse = Object.assign(userDb);
    const updatedUser = JSON.parse(JSON.stringify(userToParse));
    const nameHelper = updatedUser.name;
    updatedUser.name = 'Karol';
    delete updatedUser['createDate'];
    delete updatedUser['hash'];
    delete updatedUser['salt'];
    delete updatedUser['role'];
    delete updatedUser['isStudent'];
    delete updatedUser['isActive'];
    delete updatedUser['firstLogin'];
    delete updatedUser['sex'];
    delete updatedUser['reservations'];
    delete updatedUser['__v'];
    delete updatedUser['sumPrice'];
    const security = 'ndmsfmnfds3234jn23j234kjnfsdfnk2rnjfsmd';

    // act
    const result = await axios.patch(
      `http://localhost:3001/api/${security}/user/update`,
      { user: updatedUser },
      { axiosConfig },
    );

    // asserts
    expect(result.status).toEqual(200);
    expect(result.data).toMatchObject(updatedUser);

    updatedUser.name = nameHelper;
    await axios.patch(
      `http://localhost:3001/api/${security}/user/update`,
      { user: updatedUser },
      { axiosConfig },
    );
  });
});
