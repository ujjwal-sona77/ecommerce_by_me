const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.DB_URL)
.then(()=> {
    console.log("Connected To Database");
})
.catch((err)=> {
    console.log(err.message);
});

module.exports = mongoose.connection;