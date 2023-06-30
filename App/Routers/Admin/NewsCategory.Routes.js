const { NewsCategoryController } = require("../../Http/Controller/Admin/News/NewsCategory.Controller");
const router = require("express").Router();

    router.post("/create", NewsCategoryController.createNewsCategory);
    router.get("/list", NewsCategoryController.listOfNewsCategory);
    router.get("/list/:id", NewsCategoryController.listOfNewsCategoryById);
    router.patch("/update/:id", NewsCategoryController.updateNewsCategory);

module.exports = {
    NewsCategoryApiRoutes: router
}