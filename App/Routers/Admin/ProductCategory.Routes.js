const { ProductCategoryController } = require("../../Http/Controller/Admin/Category/ProductCategory.Controller");

const router = require("express").Router();

router.post("/create", ProductCategoryController.createProductCategory);

module.exports = {
    productCategoryApiRoutes: router
}