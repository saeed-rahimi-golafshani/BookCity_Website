const { SubCategoryController } = require("../../Http/Controller/Admin/Category/SubCategory.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("SubCategory").fields([{name: "image"}]), SubCategoryController.createSubcategory);
router.get("/list", SubCategoryController.listOfSubcategory);
router.get("/list/:id", SubCategoryController.listOfSubcategoryById);
router.patch("/update/:id", uploadFile("SubCategory").fields([{name: "image"}]), SubCategoryController.updateOfSubCategroy)
router.delete("/delete/:id", SubCategoryController.deleteSubcategory);

module.exports = {
    SubcategoryApiRoutes: router
}