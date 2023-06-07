const { CategoryApiRoutes } = require("./Category.Routes");
const router = require("express").Router();

router.use("/category", CategoryApiRoutes);

module.exports = {
    AdminApiRoutes: router
}