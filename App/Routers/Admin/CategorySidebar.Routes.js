const { CategorySidebarController } = require("../../Http/Controller/Admin/Category/CategorySidebar.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("Icon_Sidebar").fields([{name: "icon"}]), CategorySidebarController.createCategorySidebar)
router.get("/list", CategorySidebarController.listOfCategorySidbar);
router.get("/list/:id", CategorySidebarController.listOfCategoryById);
router.patch("/update/:id", uploadFile("Icon_Sidebar").fields([{name: "icon"}]), CategorySidebarController.updateOfCategorySidbar)
router.delete("/delete/:id", CategorySidebarController.deleteCategorySidbar);

module.exports = {
    CategorySilebarApiRoutes: router
}