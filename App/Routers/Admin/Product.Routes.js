const { ProductController } = require("../../Http/Controller/Admin/Product/Product.Controller");
const { stringToArray } = require("../../Http/Middleware/stringToArray");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

    router.post("/create", 
    uploadFile("Product").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]), 
    stringToArray("tags"),
    ProductController.createProduct);
    router.get("/list", ProductController.listOfProduct);
    router.get("/list/:id", ProductController.listOfProductById)

module.exports = {
    ProductApiRoutes: router
}