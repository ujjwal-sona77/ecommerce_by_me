const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const logout = require("../utils/Loggout");

router.get("/", (req, res) => {
    const error = req.flash("error");
    res.render("index", { error });
});

router.get("/logout", logout);

router.get("/login", (req, res) => {
    const error = req.flash("error");
    res.render("login", { error });
});
router.get("/cart", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate("cart");
    res.render("cart", { user });
});

router.get("/shop", isLoggedIn, async (req, res) => {
    const success = req.flash("success");
    const user = await userModel.findOne({ email: req.user.email });
    const products = await productModel.find();
    res.render("shop", { products , user , success });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect("/shop");
    req.flash("success", "Product added to cart");
});

module.exports = router;

