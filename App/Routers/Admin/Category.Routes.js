const { CategoryController } = require("../../Http/Controller/Admin/Category/Category.Controller");
const router = require("express").Router();

router.post("/create", CategoryController.createCategory);
router.get("/list", CategoryController.listOfCategory);
router.get("/all_list", CategoryController.listOfAllCategory);
router.delete("/remove/:id", CategoryController.removeCategory);
router.patch("/update/:id", CategoryController.editCategory);

module.exports = {
    CategoryApiRoutes: router 
}