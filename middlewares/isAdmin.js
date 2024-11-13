const userModel = require("../models/userModel");

module.exports.isAdmin = async (req, res, next) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        if (user.isAdmin === false) {
            req.flash("error", "something went wrong");
            res.redirect("/");
        } else {
            next();
        }
    } catch (err) {
        req.flash("error", "something went wrong");
        res.redirect("/");
    }
}