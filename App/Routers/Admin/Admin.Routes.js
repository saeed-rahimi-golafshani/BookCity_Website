const { AdminApiBlogRoutes } = require("./Blog.Routes");
const { CategoryApiRoutes } = require("./Category.Routes");
const router = require("express").Router();

router.use("/category", CategoryApiRoutes);
router.use("/blog", AdminApiBlogRoutes)


module.exports = {
    AdminApiRoutes: router
}