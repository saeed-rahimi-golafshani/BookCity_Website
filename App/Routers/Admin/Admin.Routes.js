const { AdminApiBlogRoutes } = require("./Blog.Routes");
const { CategoryApiRoutes } = require("./Category.Routes");
const { ProducerApiRoutes } = require("./Producer.Routes");
const { ProductApiRoutes } = require("./Product.Routes");
const router = require("express").Router();

router.use("/category", CategoryApiRoutes);
router.use("/blog", AdminApiBlogRoutes)
router.use("/producer", ProducerApiRoutes)
router.use("/product", ProductApiRoutes)


module.exports = {
    AdminApiRoutes: router
}