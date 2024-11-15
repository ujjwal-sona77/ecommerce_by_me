const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Product", productSchema);