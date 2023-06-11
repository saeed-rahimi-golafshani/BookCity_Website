const { AdminApiBlogRoutes } = require("./Blog.Routes");
const { CategoryApiRoutes } = require("./Category.Routes");
const { ProducerApiRoutes } = require("./Producer.Routes");
const router = require("express").Router();

router.use("/category", CategoryApiRoutes);
router.use("/blog", AdminApiBlogRoutes)
router.use("/producer", ProducerApiRoutes)


module.exports = {
    AdminApiRoutes: router
}