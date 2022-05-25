const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        email : { type: String, required: true, unique: true},
        firstName : { type: String, required: true},
        lastName : { type: String, required: true},
        password : { type: String, required: true}
    },
    { collection: 'users' }
)

const model = mongoose.model('UserData', User);

module.exports = model;