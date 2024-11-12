const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ecommerce_by_me")
.then(()=> {
    console.log("Connected To Database");
});

module.exports = mongoose.connection;