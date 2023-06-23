const { CategoryNavbarController } = require("../../Http/Controller/Admin/Category/CategoryNavbar.Controller");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

 router.post("/create", uploadFile("Icon_Navbar").fields([{name: "icon"}]), CategoryNavbarController.createCategoryNavbar);

module.exports = {
    CategoryNavbarApiRoutes: router
}