const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLenght: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: Buffer,
    orders: {
        type: Array,
        default: []
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;