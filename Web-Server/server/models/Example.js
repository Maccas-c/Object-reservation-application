const mongoose = require('mongoose');


const ExampleSchema = mongoose.Schema({
    title: String,
    nextvalue: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ExampleSchema', ExampleSchema);