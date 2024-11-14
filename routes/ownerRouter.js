const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const { isAdmin } = require("../middlewares/isAdmin");
const upload = require("../config/multer");
const { createProduct } = require("../controllers/createProduct");
const userModel = require("../models/userModel");



router.get("/", isLoggedIn, isAdmin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email })
    const success = req.flash("success");
    res.render("ownerDashboard", { user, success });
});

router.get("/allproducts", isLoggedIn, isAdmin, async (req, res) => {
    const success = req.flash("success");
    const products = await productModel.find();
    res.render("allproducts", { products, success });
});


router.get("/createproduct", isLoggedIn, isAdmin, (req, res, next) => {
    const success = req.flash("success");
    res.render("createproducts", { success });
});
router.get("/allusers", isLoggedIn, isAdmin, async (req, res) => {
    const users = await userModel.find();
    const success = req.flash("success");
    res.render("allusers", { users, success });
});

router.post("/delete/user/:id", isLoggedIn, isAdmin, async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/owner/allusers");
    req.flash("success", "User deleted successfully");
});

router.post("/edit/user/:id", isLoggedIn, isAdmin, async (req, res) => {
    await userModel.findOneAndUpdate({ _id: req.params.id }, { fullname: req.body.fullname, email: req.body.email, isAdmin: req.body.isAdmin });
    res.redirect("/owner/allusers");
    req.flash("success", "User updated successfully");
});

router.get("/edit/user/:id", isLoggedIn, isAdmin, async (req, res) => {
    const user = await userModel.findOne({ _id: req.params.id });
    res.render("edituser", { user });
});
router.get("/delete/product/:id", isLoggedIn, isAdmin, async (req, res) => {
    try {
        await productModel.findOneAndDelete({ _id: req.params.id });
        res.redirect("/owner/allproducts");
        req.flash("success", "Product deleted successfully");
    } catch (error) {
        console.error(error.message);
    }
});

router.get("/edit/product/:id", isLoggedIn, isAdmin, async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.id });
        const success = req.flash("success");
        res.render("editproduct", { success, product });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading product for edit");
    }
});

router.post("/edit/products/:id", isLoggedIn, isAdmin, upload.single("image"), async (req, res) => {
    try {
        // Find the product by ID
        const product = await productModel.findOneAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
        }, { new: true });

        // Update image if provided
        if (req.file) {
            product.image = req.file.buffer;
        }

        await product.save();
        req.flash("success", "Product updated successfully");
        res.redirect("/owner/allproducts");
    } catch (error) {
        console.error(error);
        req.flash("error", "Error updating product");
        res.redirect("/owner/allproducts");
    }
});


router.post("/createproducts", isLoggedIn, isAdmin, upload.single("image"), createProduct);


module.exports = router;

