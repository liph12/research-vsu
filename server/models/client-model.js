const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema(
    {
        userId: { type : Schema.Types.ObjectId, ref : 'users'},
        LRN : { type: String, required: true, unique: true },
        firstName : { type: String, required: true },
        lastName : { type: String, required: true },
    },
    { collection: 'clients' }
)

const model = mongoose.model('ClientData', Client);

module.exports = model;