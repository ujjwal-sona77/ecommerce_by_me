const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const error = req.flash("error");
    res.render("index", {error});
});

router.get("/login", (req, res) => {
    const error = req.flash("error");
    res.render("login", {error});
});

module.exports = router;

