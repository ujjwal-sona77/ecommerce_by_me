const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    gstin: {
        type: String,
    },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
});

module.exports = mongoose.model("Owner", ownerSchema);