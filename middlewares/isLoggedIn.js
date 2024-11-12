const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = async (req , res , next) => {
    if (!req.cookies.token) {
        req.flash("error" , "You must be logged in");
        res.redirect("/login");
    } 

    try {
        let decoded = jwt.verify(req.cookies.token , process.env.JWT_SECRET);
        let user = await userModel.findOne({email: decoded.email})
        .select("-password");
        req.user = user;
        next();
    } catch (err) {
        req.flash("error" , "Something went wrong");
        res.redirect("/login");
    }
}
