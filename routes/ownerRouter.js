const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Owner = require("../models/ownerModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/signup", isLoggedIn , (req, res, next) => {
    const error = req.flash("error");
    res.render("ownerSignup", { error });
});
router.get("/login", isLoggedIn , (req, res, next) => {
    const error = req.flash("error");
    res.render("ownerLogin", { error });
});
router.post("/register", async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        const checker = await Owner.findOne({ email });
        if (checker) {
            req.flash("error", "Email already exists");
            res.redirect("/owner/signup");
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const owner = await Owner.create({ email, fullname, password: hash });
                    let token = jwt.sign({ email, id: owner._id }, process.env.JWT_SECRET);
                    res.cookie("token", token);
                    res.redirect("/owners/createproduct");
                });
            });
        }
    } catch (error) {
        console.log(error.message);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner) {
        req.flash("error", "Invalid email or password");
        res.redirect("/owner/login");
    } else {
        bcrypt.compare(password, owner.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email, id: owner._id }, process.env.JWT_SECRET);
                res.cookie("token", token);
                res.redirect("/owners/createproduct");
            } else {
                req.flash("error", "Invalid email or password");
                res.redirect("/owner/login");
            }
        });
    }
});

module.exports = router;

