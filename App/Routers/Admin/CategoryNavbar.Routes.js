const { CategoryNavbarController } = require("../../Http/Controller/Admin/Category/CategoryNavbar.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

    router.post("/create", uploadFile("Icon_Navbar").fields([{name: "icon"}]), CategoryNavbarController.createCategoryNavbar);
    router.get("/list", CategoryNavbarController.listOfCategoryNavbar);
    router.get("/list/:id", CategoryNavbarController.listOfCategoryNavbarById);
    router.patch("/update/:id", uploadFile("Icon_Navbar").fields([{name: "icon"}]), CategoryNavbarController.updateCategoryNavbar);
    router.delete("/delete/:id", CategoryNavbarController.deleteCategoryNavbar);
    

module.exports = {
    CategoryNavbarApiRoutes: router 
}