const { SubCategoryApiRoutes } = require("./SubCategory.Routes");
const router = require("express").Router();

router.use("/sub_category", SubCategoryApiRoutes);

module.exports = {
    AdminApiRoutes: router
}