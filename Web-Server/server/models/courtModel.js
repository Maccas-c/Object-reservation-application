const mongoose = require('mongoose');


const courtModel = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required:true 
    }
})
module.exports = mongoose.model('courtModel', courtModel);