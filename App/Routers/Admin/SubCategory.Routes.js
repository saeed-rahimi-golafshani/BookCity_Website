const { SubCategoryController } = require("../../Http/Controller/Admin/Category/SubCategory.Controller");
const router = require("express").Router();

router.post("/create", SubCategoryController.createSubCategory);
router.get("/list", SubCategoryController.listOfSubCategory);
router.get("/all_list", SubCategoryController.listOfAllSubCategory);
router.delete("/remove/:id", SubCategoryController.removeSubCategory);
router.patch("/update/:id", SubCategoryController.editSubCategory);

module.exports = {
    SubCategoryApiRoutes: router
}