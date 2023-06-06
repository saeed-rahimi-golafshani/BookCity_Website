const { productCategoryApiRoutes } = require("./ProductCategory.Routes");
const { SubCategoryApiRoutes } = require("./SubCategory.Routes");
const router = require("express").Router();

router.use("/sub_category", SubCategoryApiRoutes);
router.use("/product_category", productCategoryApiRoutes);

module.exports = {
    AdminApiRoutes: router
}