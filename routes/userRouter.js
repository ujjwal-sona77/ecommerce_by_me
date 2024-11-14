const express = require("express");
const { route } = require("./indexRouter");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/AuthControllers");
const userModel = require("../models/userModel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../config/multer");
const jwt = require("jsonwebtoken");

router.get("/profile", isLoggedIn, async (req, res) => {
    const success = req.flash("success");
    const user = await userModel.findOne({ email: req.user.email }).populate("cart");
    res.render("profile", { user, success });
});

router.get("/edit-profile", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    res.render("edit-profile", { user });
});

router.post("/update-profile", isLoggedIn, upload.single("picture"), async (req, res) => {
    const user = await userModel.findOneAndUpdate({ email: req.user.email }, { new: true });
    if (req.file) {
        user.picture = req.file.buffer;
    }
    if (req.body.fullname && req.body.fullname.trim() !== "") {
        user.fullname = req.body.fullname;
    }
    if (req.body.email && req.body.email.trim() !== "") {
        user.email = req.body.email; 
    }
    await user.save();
    let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.cookie("token", token);
    req.flash("success", "Profile updated successfully");
    res.redirect("/users/profile");
});

router.post("/registeruser", registerUser);
router.post("/loginuser", loginUser);

module.exports = router;

