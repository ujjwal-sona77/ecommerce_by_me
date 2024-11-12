const express = require("express");
const { route } = require("./indexRouter");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/AuthControllers");

router.get("/", (req, res) => {
    res.send("user router")
});

router.post("/registeruser", registerUser);
router.post("/loginuser", loginUser);

module.exports = router;

