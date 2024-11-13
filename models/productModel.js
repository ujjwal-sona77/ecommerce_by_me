const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    discount: {
        type: String,
    },
    panelcolor: {
        type: String,
    },
    bgcolor: {
        type: String,
    }   
});

module.exports = mongoose.model("Product", productSchema);