const productModel = require("../models/productModel");

module.exports.createProduct = async (req, res) => {
    try {
        let {name , price , discount , panelcolor , bgcolor , textcolor} = req.body;
        let image = req.file.buffer;
        let product = await productModel.create({name , price , discount , panelcolor , bgcolor , image , textcolor});
        res.redirect("/owner/createproduct");
        req.flash("success", "Product created successfully");
    } catch (err) {
        console.log(err.message);
    }
}