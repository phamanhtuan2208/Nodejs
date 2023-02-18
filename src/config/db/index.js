const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

async function connect () {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/data_news', {
            UseNewUrlParser: true,
            useUnifiedTopology: true,
        })

        
        console.log('Connected db');

    } catch (error) {
        
        console.log('connecting error db');
    }
}

module.exports = { connect };