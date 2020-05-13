const mongoose = require('mongoose');

require('dotenv').config();



const devConnection = process.env.DB_CONNECTION;
const prodConnection = process.env.DB_CONNECTION_PROD;
const atlasConnection = process.env.DB_CONNECTION_ATLAS;

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to database ' + prodConnection);
    });
} else if (process.env.NODE_ENV === 'atlas') {
    mongoose.connect(atlasConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to database ' + atlasConnection);
    });
} else {
    mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to database ' + devConnection);
    });
}
module.exports = mongoose.connection;