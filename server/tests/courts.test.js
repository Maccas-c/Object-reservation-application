const index = require('../routes/courts.js');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

test('index route works', done => {
  request(app).get('/api/court').expect(200, done);
});

describe('/api/admin/courts/:courtId', function () {
  it('jjj', async function (done) {
    request(app).get('/api/admin/courts/lol').expect(404);
  });
});
