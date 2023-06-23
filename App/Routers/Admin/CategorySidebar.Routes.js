const { CategorySidebarController } = require("../../Http/Controller/Admin/Category/CategorySidebar.Controller");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

router.post("/create", uploadFile("Icon_Sidebar").fields([{name: "icon"}]), CategorySidebarController.createCategorySidebar)

module.exports = {
    CategorySilebarApiRoutes: router
}