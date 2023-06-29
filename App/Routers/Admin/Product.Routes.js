const { ProductController } = require("../../Http/Controller/Admin/Product/Product.Controller");
const { stringToArray } = require("../../Http/Middleware/stringToArray");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

    router.post("/create", 
    uploadFile("Product").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]), 
    stringToArray("tags"),
    ProductController.createProduct);
    router.get("/list", ProductController.listOfProduct);
    router.get("/list/:id", ProductController.listOfProductById);
    router.get("/list_of_producer/:producerId", ProductController.listOfProductByProducer);
    router.patch("/update/:id", 
    uploadFile("Product").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]), 
    stringToArray("tags"),
    ProductController.updateProduct);
    router.delete("/delete/:id", ProductController.removeProduct)


module.exports = {
    ProductApiRoutes: router
}