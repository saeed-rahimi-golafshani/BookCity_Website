const { BlogController } = require("../../Http/Controller/Admin/Blog/Blog.Controller");
const { stringToArray } = require("../../Http/Middleware/stringToArray");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", 
uploadFile("Blog").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]), 
stringToArray("tags"), 
stringToArray("category"), 
stringToArray("source"), 
BlogController.createBlog
);
router.get("/list", BlogController.listOfBlog);
router.get("/list/:id", BlogController.listofBlogById);
router.patch("/update/:id", 
uploadFile("Blog").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]), 
stringToArray("tags"), 
stringToArray("category"), 
stringToArray("source"), 
BlogController.updateBlogById
);
router.delete("/remove/:id", BlogController.removeBlogById)

module.exports = {
    AdminApiBlogRoutes: router
}