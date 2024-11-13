const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const { isAdmin } = require("../middlewares/isAdmin");
const upload = require("../config/multer");
router.get("/", isLoggedIn, isAdmin, (req, res, next) => {
    res.send("owner dashboard");
});
router.get("/createproduct", isLoggedIn, isAdmin, (req, res, next) => {
    const success = req.flash("success");
    res.render("createproducts", { success });
});

router.post("/createproducts", isLoggedIn, isAdmin, upload.single("image"), async (req, res, next) => {
    try {
        let {name , price , discount , panelcolor , bgcolor} = req.body;
        let image = req.file.buffer;
        let product = await productModel.create({name , price , discount , panelcolor , bgcolor , image});
        res.redirect("/owner/createproduct");
        req.flash("success", "product created successfully");
    } catch (err) {
        console.log(err.message);
    }
});


module.exports = router;

