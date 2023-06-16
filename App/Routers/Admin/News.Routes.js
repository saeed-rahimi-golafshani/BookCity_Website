const { NewsController } = require("../../Http/Controller/Admin/News/News.Controller");
const { stringToArray } = require("../../Http/Middleware/stringToArray");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

    router.post("/create", 
    uploadFile("News").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]), 
    stringToArray("tags"), 
    stringToArray("source"),
    stringToArray("category"),
    NewsController.createNews);
    router.get("/list", NewsController.listOfNews);
    router.get("/list/:id", NewsController.listOfNewsById);
    router.get("/listbycategory/:catId", NewsController.listOfNewsByCategory);
    router.patch("/update/:id", 
    uploadFile("News").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]), 
    stringToArray("tags"), 
    stringToArray("source"),
    stringToArray("category"),
    NewsController.updateNews);
    router.delete("/delete/:id", NewsController.deleteNews);
    

module.exports = {
    NewsApiRoutes: router
}