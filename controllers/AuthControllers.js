const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            req.flash("error", "User already exists , please login");
            res.redirect("/login");
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const user = await userModel.create({ fullname, email, password: hash });
                    let token = jwt.sign({ email, id: user._id , password }, process.env.JWT_SECRET);
                    res.cookie("token", token);
                    res.redirect("/shop");
                });
            });
        }

    } catch (err) {
        console.log(err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        req.flash("error", "Invalid username or password");
        res.redirect("/login");
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET);
                res.cookie("token", token);
                res.redirect("/shop");
            } else {
                req.flash("error", "Invalid username or password");
                res.redirect("/login");
            }
        });
    }
}
